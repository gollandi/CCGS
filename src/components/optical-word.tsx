'use client';

import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';

/** A word appears at the fracture, then becomes the beginning of a sentence. */
export function OpticalWord({ stage, open, hidden, motionOff, intention }: {
  stage: RefObject<HTMLDivElement | null>;
  open: boolean;
  hidden: boolean;
  motionOff: boolean;
  intention: number;
}) {
  const word = useRef<HTMLSpanElement>(null);
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
          scale: target.height / element.offsetHeight, opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)', rotation: 0, skewY: 0,
          duration: motionOff || immediate ? 0 : 1.1, ease: 'power3.inOut',
          onComplete: () => setArrived(true),
        });
      } else {
        setArrived(false);
        gsap.set(element, { x: 0, y: -17, scale: 1, opacity: 0, clipPath: 'inset(52% 0% 48% 0%)', rotation: 0, skewY: 0 });
      }
    }
    position();
    const resize = () => position(true);
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); gsap.killTweensOf(element); };
  }, [open, motionOff, stage]);

  useLayoutEffect(() => {
    if (!open) {
      gsap.to(word.current, { opacity: intention > 0 ? 1 : 0,
        clipPath: intention > 0 ? 'inset(0% 0% 0% 0%)' : 'inset(52% 0% 48% 0%)',
        y: intention > 0 ? -24 : -17,
        duration: motionOff ? 0 : .7, ease: 'power3.out', overwrite: true });
    }
  }, [intention, open, motionOff]);

  return <span ref={word} className="optical-word" aria-hidden="true" data-arrived={open && arrived}
    style={{ visibility: hidden || (open && arrived) ? 'hidden' : 'visible' }}>Not</span>;
}
