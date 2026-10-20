'use client';

import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';

/** One visible word crosses from the optical field into the sentence. */
export function OpticalWord({ stage, open, hidden, motionOff, intention }: {
  stage: RefObject<HTMLDivElement | null>;
  open: boolean;
  hidden: boolean;
  motionOff: boolean;
  intention: number;
}) {
  const word = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const previousIntention = useRef(0);
  const [arrived, setArrived] = useState(false);

  useLayoutEffect(() => {
    const element = word.current;
    const container = stage.current;
    if (!element || !container) return;
    gsap.set(element, { xPercent: -50, yPercent: -50 });
    function position(immediate = false) {
      if (!element || !container) return;
      gsap.killTweensOf(element);
      const destination = container.querySelector<HTMLElement>('.wine-word-destination');
      if (open && destination) {
        const target = destination.getBoundingClientRect();
        const origin = container.getBoundingClientRect();
        const style = getComputedStyle(element);
        gsap.to(element, {
          x: target.left + target.width / 2 - origin.left - parseFloat(style.left),
          y: target.top + target.height / 2 - origin.top - parseFloat(style.top),
          scale: target.height / element.offsetHeight,
          rotation: 0, skewY: 0, color: '#302d2b',
          duration: motionOff || immediate ? 0 : 1.2, ease: 'power3.inOut',
          onComplete: () => setArrived(true),
        });
      } else {
        setArrived(false);
        if (!played.current && !motionOff && !immediate) {
          played.current = true;
          gsap.timeline().set(element, { x: 0, y: 0, scale: 1, rotation: 0, skewY: 0, color: '#593940' })
            .to(element, { rotation: -32, skewY: -10, duration: 1, ease: 'power3.out' }, .5)
            .to(element, { rotation: -10, skewY: -4, duration: 1.5, ease: 'power2.out' }, 1.5);
        } else {
          gsap.to(element, { x: 0, y: 0, scale: 1, rotation: motionOff ? 0 : -10,
            skewY: motionOff ? 0 : -4, color: '#593940', duration: motionOff || immediate ? 0 : .9, ease: 'power3.inOut' });
        }
      }
    }
    position();
    const resize = () => position(true);
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); gsap.killTweensOf(element); };
  }, [open, motionOff, stage]);

  useLayoutEffect(() => {
    if (!open && !motionOff && (intention > 0 || previousIntention.current > 0)) {
      gsap.to(word.current, { rotation: -10 - intention * 35, skewY: -4 - intention * 12,
        duration: .45, ease: 'power3.out', overwrite: true });
    }
    previousIntention.current = intention;
  }, [intention, open, motionOff]);

  return <span ref={word} className="optical-word" aria-hidden="true" data-arrived={open && arrived}
    style={{ visibility: hidden || (open && arrived) ? 'hidden' : 'visible' }}>lunch.</span>;
}
