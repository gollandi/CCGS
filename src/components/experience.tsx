'use client';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, type ReactNode, type PointerEvent, type CSSProperties } from 'react';
import gsap from 'gsap';
import { discoveries, practicalInformation, portals, stories, currentMenuUrl } from '@/lib/discovery';
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

  const [visited,setVisited]=useState<number[]>([]);
  const [hover,setHover]=useState<{index:number;x:number;y:number}|null>(null);
  const [drag,setDrag]=useState<{index:number;x:number;y:number}|null>(null);
  const field=useRef<FieldInput>({x:.4,y:.45,energy:0,colour:0,open:0});
  const wake=useRef<(()=>void)|null>(null);
  const stage=useRef<HTMLDivElement>(null);
  const panel=useRef<HTMLDivElement>(null);
  const back=useRef<HTMLButtonElement>(null);
  const buttons=useRef<(HTMLButtonElement|null)[]>([]);
  const gesture=useRef<{index:number;x:number;y:number;id:number;cancelled:boolean}|null>(null);
  const suppressClick=useRef(false);
  const motionOff=reduced||still;
  const onReady=useCallback((invalidate:()=>void)=>{wake.current=invalidate;setReady(true);},[]);
  const onFailure=useCallback(()=>setFailed(true),[]);
  useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);const activity=()=>setVisible(!document.hidden);update();activity();mq.addEventListener('change',update);document.addEventListener('visibilitychange',activity);return()=>{mq.removeEventListener('change',update);document.removeEventListener('visibilitychange',activity);};},[]);
  useEffect(()=>{if(selected===null)return;if(panel.current)panel.current.scrollTop=0;back.current?.focus({preventScroll:true});if(motionOff)return;const context=gsap.context(()=>{const animation=gsap.timeline();if(selected===0){animation.fromTo(panel.current?.querySelectorAll('.wine-prefix,.wine-line-two')??[],{opacity:0},{opacity:1,duration:.65,stagger:.12,ease:'power3.out'},.45).fromTo(panel.current?.querySelectorAll('.story-body,.story-aside,.story-sources')??[],{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.7,stagger:.08,ease:'power3.out'},.25);}else{animation.fromTo(panel.current,{opacity:.5,y:10},{opacity:1,y:0,duration:.45,ease:'power3.out'});}},panel);return()=>context.revert();},[selected,motionOff]);
  const close=useCallback(()=>{const previous=selected;setSelected(null);setHover(null);field.current.colour=0;field.current.open=0;field.current.energy=0;wake.current?.();requestAnimationFrame(()=>{if(previous!==null)buttons.current[previous<discoveries.length?portals.findIndex(portal=>portal.stories.includes(previous)):previous]?.focus({preventScroll:true});});},[selected]);
  useEffect(()=>{const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){if(selected!==null){event.preventDefault();close();}}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape);},[selected,close]);
  function open(index:number){setHover(null);setSelected(index);setVisited(old=>old.includes(index)?old:[...old,index]);field.current.colour=index===0?1:0;field.current.open=index===0?1:0;field.current.energy=0;wake.current?.();}
  function track(event:PointerEvent){if(!stage.current)return;const box=(stage.current.querySelector('.light-field')??stage.current).getBoundingClientRect();field.current.x=(event.clientX-box.left)/box.width;field.current.y=(event.clientY-box.top)/box.height;const primary=(event.target as Element).closest('.object-position-0');if(gesture.current?.index===0){field.current.energy=.85;}else{field.current.energy=primary&&event.pointerType==='mouse' ? .18 : 0;}wake.current?.();}
  function down(event:PointerEvent<HTMLButtonElement>,index:number){if(!event.isPrimary||event.button!==0)return;suppressClick.current=false;gesture.current={index,x:event.clientX,y:event.clientY,id:event.pointerId,cancelled:false};event.currentTarget.setPointerCapture(event.pointerId);setDrag({index,x:0,y:0});track(event);}
  function move(event:PointerEvent<HTMLButtonElement>,index:number){track(event);if(!gesture.current){const b=event.currentTarget.getBoundingClientRect();setHover({index,x:(event.clientX-b.left-b.width/2)*.35,y:(event.clientY-b.top-b.height/2)*.25});}const start=gesture.current;if(!start||start.id!==event.pointerId)return;setDrag({index:start.index,x:Math.max(-70,Math.min(70,event.clientX-start.x)),y:Math.max(-70,Math.min(70,event.clientY-start.y))});}
  function end(event:PointerEvent<HTMLButtonElement>,cancelled=false){const start=gesture.current;if(!start||start.id!==event.pointerId)return;gesture.current=null;setDrag(null);field.current.energy=0;wake.current?.();if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);suppressClick.current=cancelled||Math.hypot(event.clientX-start.x,event.clientY-start.y)>8;if(start.index!==0&&shouldReveal(event.clientX-start.x,event.clientY-start.y,cancelled))open(portals[start.index].stories[0]);}
  const story=selected===null?null:stories[selected];
  const related=selected===null?[]:portals.find(portal=>portal.stories.includes(selected))?.stories??[];
  return <div ref={stage} className={`experience ${selected!==null?'has-story':''} ${selected===0?'wine-open':''} ${motionOff?'motion-off':''} ${ready&&!motionOff&&!failed?'is-ready':''}`} data-renderer={failed?'fallback':motionOff?'still':ready?'webgl':'loading'} onPointerMove={track} onPointerLeave={()=>{if(!gesture.current){field.current.energy=0;wake.current?.();}}}>
    <nav className="practical-nav" aria-label="About the evening">
      {practicalInformation.map((item,index)=><button key={item.id} ref={element=>{buttons.current[discoveries.length+index]=element;}} aria-expanded={selected===discoveries.length+index} aria-controls="chelsea-story" onClick={()=>open(discoveries.length+index)}>{item.label}</button>)}
      <a href={currentMenuUrl} target="_blank" rel="noopener noreferrer">Current menu <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></a>
    </nav>
    <div className="light-field" aria-hidden="true"><MembraneFallback/>{!motionOff&&!failed&&<Boundary onFailure={onFailure}><Scene input={field} active={visible} onReady={onReady} onFailure={onFailure}/></Boundary>}</div>
    <div className="field-touch" aria-hidden="true" />
    <div className="objects" aria-label="Explore Chelsea">
      {portals.map((item,index)=><button key={item.object} ref={element=>{buttons.current[index]=element;}} className={`story-object object-position-${index} ${selected!==null&&item.stories.includes(selected)?'selected':''} ${item.stories.every(storyIndex=>visited.includes(storyIndex))?'visited':''} ${drag?.index===index?'is-held':''}`} style={{'--drag-x':`${drag?.index===index?drag.x:0}px`,'--drag-y':`${drag?.index===index?drag.y:0}px`,'--bend':`${drag?.index===index?drag.x*.35:0}deg`,'--index':index} as CSSProperties} aria-label={`${item.prompt} — ${item.label}`} aria-expanded={selected!==null&&item.stories.includes(selected)} aria-controls="chelsea-story" hidden={selected!==null} onFocus={()=>{if(index===0&&selected===null){field.current.energy=.24;wake.current?.();}}} onBlur={()=>{field.current.energy=0;wake.current?.();}} onPointerDown={e=>down(e,index)} onPointerMove={e=>move(e,index)} onPointerLeave={()=>setHover(null)} onPointerUp={e=>end(e)} onPointerCancel={e=>end(e,true)} onLostPointerCapture={e=>end(e,true)} onClick={event=>{if(event.detail!==0&&suppressClick.current){suppressClick.current=false;return;}open(item.stories[0]);}}>{index===0?<span className="optical-target" aria-hidden="true"><span className="wine-marker"><StoryObject kind="glass"/><span>Swirl a little</span></span></span>:<StoryObject kind={item.object} x={motionOff?0:drag?.index===index?drag.x:hover?.index===index?hover.x:0} y={motionOff?0:drag?.index===index?drag.y:hover?.index===index?hover.y:0}/>}<span className="object-caption">{item.prompt}<span className="discovery-mark" aria-hidden="true">{visited.includes(index)?'—':'+'}</span></span></button>)}
    </div>

    <div className={`story ${selected===0?"wine-story":""}`} data-story-kind={selected!==null&&selected>=discoveries.length?"practical":"curiosity"} data-catalogue-number={story?.catalogueNumber} id="chelsea-story" role="region" tabIndex={0} aria-labelledby="story-title" ref={panel} hidden={!story}>
      {story&&<><button ref={back} className="back-button" onClick={close}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg>Back to the evening</button><h2 id="story-title" aria-label={story.title}>{selected===0?<><span className="wine-line-one"><span className="wine-word-destination">Not</span><span className="wine-prefix"> the ladies</span></span><span className="wine-line-two">who lunch.</span></>:story.title}</h2><figure className="story-photo"><img src={story.image.src} alt={story.image.alt} width={1024} height={576}/><figcaption><a href={story.image.source} target="_blank" rel="noopener noreferrer">{story.image.credit}</a></figcaption></figure><p className="story-body">{story.body}</p><p className="story-aside">{story.aside}</p><div className="story-sources">{story.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></a>)}</div>{related.length>1&&<div className="story-switcher" aria-label="More to discover here">{related.map(index=><button key={stories[index].id} aria-current={selected===index?'true':undefined} onClick={()=>open(index)}>{stories[index].label}{visited.includes(index)&&<span className="sr-only"> — discovered</span>}</button>)}</div>}</>}
    </div>
    {selected===null&&<p className="membrane-hint">Touch & move. Tap to discover.</p>}
    {!reduced&&<button className="motion-control" aria-pressed={still} onClick={()=>setStill(value=>!value)} aria-label={still?'Resume animation':'Pause animation'}><svg viewBox="0 0 24 24" aria-hidden="true">{still?<path d="m8 5 11 7-11 7Z"/>:<path d="M8 5v14M16 5v14"/>}</svg></button>}
    <noscript><style>{'.objects,.exploration-hint,.field-touch,.practical-nav,.membrane-hint{display:none!important}'}</style></noscript>
  </div>;
}
