'use client';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, type ReactNode, type PointerEvent, type CSSProperties } from 'react';
import gsap from 'gsap';
import { discoveries } from '@/lib/discovery';
import { shouldReveal } from '@/lib/gesture';
import { StoryObject } from './story-objects';
import { MembraneFallback } from './membrane-fallback';
import type { FieldInput } from './membrane-scene';
const Scene=dynamic(()=>import('./membrane-scene'),{ssr:false});
class Boundary extends Component<{children:ReactNode;onFailure:()=>void},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true};}componentDidCatch(){this.props.onFailure();}render(){return this.state.failed?null:this.props.children;}}
export default function Experience(){
  const [selected,setSelected]=useState<number|null>(null);
  const [reduced,setReduced]=useState(true);
  const [still,setStill]=useState(false);
  const [visible,setVisible]=useState(true);
  const [ready,setReady]=useState(false);
  const [failed,setFailed]=useState(false);
  const [touched,setTouched]=useState(false);
  const [visited,setVisited]=useState<number[]>([]);
  const [hover,setHover]=useState<{index:number;x:number;y:number}|null>(null);
  const [drag,setDrag]=useState<{index:number;x:number;y:number}|null>(null);
  const field=useRef<FieldInput>({x:.5,y:.5,energy:0,colour:0});
  const stage=useRef<HTMLDivElement>(null);
  const panel=useRef<HTMLDivElement>(null);
  const back=useRef<HTMLButtonElement>(null);
  const buttons=useRef<(HTMLButtonElement|null)[]>([]);
  const gesture=useRef<{index:number;x:number;y:number;id:number;cancelled:boolean}|null>(null);
  const suppressClick=useRef(false);
  const motionOff=reduced||still;
  const onReady=useCallback(()=>setReady(true),[]);
  const onFailure=useCallback(()=>setFailed(true),[]);
  useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);const activity=()=>setVisible(!document.hidden);update();activity();mq.addEventListener('change',update);document.addEventListener('visibilitychange',activity);return()=>{mq.removeEventListener('change',update);document.removeEventListener('visibilitychange',activity);};},[]);
  useEffect(()=>{if(selected===null)return;if(panel.current)panel.current.scrollTop=0;back.current?.focus({preventScroll:true});if(motionOff)return;const animation=gsap.fromTo(panel.current,{opacity:.5,y:10},{opacity:1,y:0,duration:.45,ease:'power3.out'});return()=>{animation.kill();};},[selected,motionOff]);
  const close=useCallback(()=>{const previous=selected;setSelected(null);field.current.colour=0;requestAnimationFrame(()=>{if(previous!==null)buttons.current[previous]?.focus({preventScroll:true});});},[selected]);
  useEffect(()=>{const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'&&selected!==null){event.preventDefault();close();}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape);},[selected,close]);
  function open(index:number){setSelected(index);setTouched(true);setVisited(old=>old.includes(index)?old:[...old,index]);field.current.colour=index===0?1:0;}
  function track(event:PointerEvent){if(!stage.current)return;const box=(stage.current.querySelector('.light-field')??stage.current).getBoundingClientRect();field.current.x=(event.clientX-box.left)/box.width;field.current.y=(event.clientY-box.top)/box.height;field.current.energy=gesture.current?1.8:.65;}
  function down(event:PointerEvent<HTMLButtonElement>,index:number){if(!event.isPrimary||event.button!==0)return;suppressClick.current=false;gesture.current={index,x:event.clientX,y:event.clientY,id:event.pointerId,cancelled:false};event.currentTarget.setPointerCapture(event.pointerId);setDrag({index,x:0,y:0});setTouched(true);}
  function move(event:PointerEvent<HTMLButtonElement>,index:number){track(event);if(!gesture.current){const b=event.currentTarget.getBoundingClientRect();setHover({index,x:(event.clientX-b.left-b.width/2)*.35,y:(event.clientY-b.top-b.height/2)*.25});}const start=gesture.current;if(!start||start.id!==event.pointerId)return;setDrag({index:start.index,x:Math.max(-70,Math.min(70,event.clientX-start.x)),y:Math.max(-70,Math.min(70,event.clientY-start.y))});}
  function end(event:PointerEvent<HTMLButtonElement>,cancelled=false){const start=gesture.current;if(!start||start.id!==event.pointerId)return;gesture.current=null;setDrag(null);field.current.energy=.4;if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);suppressClick.current=cancelled||Math.hypot(event.clientX-start.x,event.clientY-start.y)>8;if(shouldReveal(event.clientX-start.x,event.clientY-start.y,cancelled))open(start.index);}
  const story=selected===null?null:discoveries[selected];
  return <div ref={stage} className={`experience ${selected!==null?'has-story':''} ${motionOff?'motion-off':''} ${ready&&!motionOff&&!failed?'is-ready':''}`} data-renderer={failed?'fallback':motionOff?'still':ready?'webgl':'loading'} onPointerMove={track} onPointerLeave={()=>{field.current.energy=0;}}>
    <div className="light-field" aria-hidden="true"><MembraneFallback/>{!motionOff&&!failed&&<Boundary onFailure={onFailure}><Scene input={field} active={visible} onReady={onReady} onFailure={onFailure}/></Boundary>}</div>
    <div className="field-touch" aria-hidden="true" />
    <div className="objects" aria-label="Explore Chelsea">
      {discoveries.map((item,index)=><button key={item.id} ref={element=>{buttons.current[index]=element;}} className={`story-object object-position-${index} ${selected===index?'selected':''} ${visited.includes(index)?'visited':''} ${drag?.index===index?'is-held':''}`} style={{'--drag-x':`${drag?.index===index?drag.x:0}px`,'--drag-y':`${drag?.index===index?drag.y:0}px`,'--bend':`${drag?.index===index?drag.x*.35:0}deg`,'--index':index} as CSSProperties} aria-label={`${item.prompt} — ${item.label}`} aria-expanded={selected===index} aria-controls="chelsea-story" hidden={selected!==null&&selected!==index} onPointerDown={e=>down(e,index)} onPointerMove={e=>move(e,index)} onPointerLeave={()=>setHover(null)} onPointerUp={e=>end(e)} onPointerCancel={e=>end(e,true)} onLostPointerCapture={e=>end(e,true)} onClick={event=>{if(event.detail!==0&&suppressClick.current){suppressClick.current=false;return;}if(selected===index)close();else open(index);}}><StoryObject kind={item.object} x={motionOff?0:drag?.index===index?drag.x:hover?.index===index?hover.x:0} y={motionOff?0:drag?.index===index?drag.y:hover?.index===index?hover.y:0}/><span className="object-caption">{item.prompt}<span className="discovery-mark" aria-hidden="true">{visited.includes(index)?'—':'+'}</span></span></button>)}
    </div>
    <p className="exploration-hint" hidden={selected!==null}>{visited.length===4?'Four stories. One evening.':touched?'There is more than meets the eye.':'Touch an object. See what unfolds.'}</p>
    <div className="story" id="chelsea-story" role="region" tabIndex={0} aria-labelledby="story-title" ref={panel} hidden={!story}>
      {story&&<><button ref={back} className="back-button" onClick={close}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg>Back to the evening</button><h2 id="story-title">{story.title}</h2><p className="story-body">{story.body}</p><p className="story-aside">{story.aside}</p><div className="story-sources">{story.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></a>)}</div><div className="story-switcher" aria-label="More discoveries">{discoveries.map((item,index)=><button key={item.id} aria-label={`${["Wine","Chef","Dogs","Neighbours"][index]} — ${item.label}`} aria-current={selected===index?'true':undefined} onClick={()=>open(index)}>{['Wine','Chef','Dogs','Neighbours'][index]}</button>)}</div></>}
    </div>
    {!reduced&&<button className="motion-control" aria-pressed={still} onClick={()=>setStill(value=>!value)} aria-label={still?'Resume animation':'Pause animation'}><svg viewBox="0 0 24 24" aria-hidden="true">{still?<path d="m8 5 11 7-11 7Z"/>:<path d="M8 5v14M16 5v14"/>}</svg></button>}
    <noscript><style>{'.objects,.exploration-hint,.field-touch{display:none!important}'}</style></noscript>
  </div>;
}
