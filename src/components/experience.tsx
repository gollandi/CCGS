'use client';

import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type PointerEvent } from 'react';
import gsap from 'gsap';
import { discovery } from '@/lib/discovery';
import { getPull, shouldReveal } from '@/lib/gesture';
import { MembraneFallback } from './membrane-fallback';

const Scene = dynamic(() => import('./membrane-scene'), { ssr: false });
class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Experience() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [systemReduced, setSystemReduced] = useState(true);
  const [still, setStill] = useState(false);
  const reduced = systemReduced || still;
  const [active, setActive] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pull, setPull] = useState({ x: 0, y: 0 });
  const [resetKey, setResetKey] = useState(0);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ x: number; y: number; moved: boolean; id: number } | null>(null);
  const suppressClick = useRef(false);
  const wasOpen = useRef(false);
  const sceneReady = useCallback(() => setReady(true), []);
  const sceneFailed = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    setMounted(true);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setSystemReduced(preference.matches);
    const visibility = () => setActive(!document.hidden);
    change(); visibility();
    preference.addEventListener('change', change);
    document.addEventListener('visibilitychange', visibility);
    return () => { preference.removeEventListener('change', change); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useLayoutEffect(() => {
    if (open) closeButton.current?.focus({ preventScroll: true });
    else if (wasOpen.current) trigger.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (!panel.current || reduced) return;
    const animation = gsap.fromTo(panel.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .65, ease: 'power2.out' });
    return () => { animation.kill(); };
  }, [open, reduced]);

  const reset = useCallback(() => {
    setOpen(false); setPull({ x: 0, y: 0 }); setDragging(false); gesture.current = null;
    setResetKey(key => key + 1);
  }, []);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && (open || dragging)) { event.preventDefault(); reset(); } };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open, dragging, reset]);

  function pointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary) return;
    gesture.current = { x: event.clientX, y: event.clientY, moved: false, id: event.pointerId };
    suppressClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }
  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const x = event.clientX - start.x, y = event.clientY - start.y;
    start.moved ||= Math.hypot(x, y) > 8;
    setPull(getPull(x, y));
  }
  function pointerEnd(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    setPull({ x: 0, y: 0 });
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    suppressClick.current = start.moved;
    if (shouldReveal(event.clientX - start.x, event.clientY - start.y, cancelled)) setOpen(true);
  }

  return (
    <div className={`experience ${open ? 'is-open' : ''} ${ready && !failed && !reduced ? 'is-ready' : ''} ${dragging ? 'is-dragging' : ''}`} data-phase={open ? 'discovery' : dragging ? 'touch' : 'idle'} data-renderer={failed ? 'fallback' : reduced ? 'reduced-motion' : ready ? 'webgl' : 'loading'}>
      <div className="light-halo" aria-hidden="true" />
      <div className="membrane-art" aria-hidden="true" style={{ '--pull-x': `${pull.x * 15}px`, '--pull-y': `${-pull.y * 12}px` } as React.CSSProperties}>
        <MembraneFallback />
        {mounted && !failed && !reduced && <SceneBoundary onFailure={sceneFailed}><Scene pull={pull} open={open} reduced={reduced} active={active} resetKey={resetKey} onReady={sceneReady} onFailure={sceneFailed} /></SceneBoundary>}
      </div>
      {<button hidden={open}
        ref={trigger}
        className="light-touch"
        aria-label="Pull the light, or press to discover a Chelsea story"
        aria-expanded={open}
        aria-controls="chelsea-discovery"
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={event => pointerEnd(event)}
        onPointerCancel={event => pointerEnd(event, true)}
        onLostPointerCapture={event => pointerEnd(event, true)}
        onClick={event => { if (event.detail === 0 || !suppressClick.current) setOpen(true); suppressClick.current = false; }}
      >
        <span className="pull-hint"><span className="pull-glyph" aria-hidden="true">↗</span><span>Pull the light<span className="hint-small">A little Chelsea secret</span></span></span>
      </button>}
      <div id="chelsea-discovery" hidden={!open} ref={panel} className="discovery" role="region" aria-labelledby="discovery-heading">
        <span className="discovery-number" aria-hidden="true">A little unexpected</span>
        <h2 id="discovery-heading">Some come<br /> to say <em>“I do”.</em></h2>
        <p>{discovery.body}</p>
        <a className="source-link" href={discovery.sourceUrl} target="_blank" rel="noopener noreferrer">{discovery.sourceLabel} <span aria-hidden="true">↗</span></a>
        <button ref={closeButton} className="return-button" onClick={reset}><span aria-hidden="true">←</span> Back to the evening</button>
      </div>
      {mounted && !systemReduced && <button hidden={open} className="motion-toggle" onClick={() => setStill(value => !value)} aria-pressed={still} aria-label={still ? 'Use moving artwork' : 'Use still artwork'} title={still ? 'Use moving artwork' : 'Use still artwork'}>
        {still ? <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5 8 5-8 5Z" /></svg> : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10" /></svg>}
      </button>}
      <noscript><style>{'.light-touch { display: none; } .membrane-fallback { opacity: 1 !important; }'}</style></noscript>
    </div>
  );
}
