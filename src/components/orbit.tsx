'use client';
import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
const Scene=dynamic(()=>import('./orbit-scene'),{ssr:false});
class SceneBoundary extends Component<{children:ReactNode;onFailure:()=>void},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return{failed:true};}
  componentDidCatch(){this.props.onFailure();}
  render(){return this.state.failed?null:this.props.children;}
}
export function Orbit({paused}:{paused:boolean}) {
  const ref=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  const [supported,setSupported]=useState(false);
  const [ready,setReady]=useState(false);
  const [foreground,setForeground]=useState(true);
  useEffect(()=>{
    const canvas=document.createElement('canvas');
    try{const context=canvas.getContext('webgl2');setSupported(!!context);context?.getExtension('WEBGL_lose_context')?.loseContext();}catch{setSupported(false);}
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'100px'});
    if(ref.current)observer.observe(ref.current);
    const visibility=()=>setForeground(document.visibilityState==='visible');
    document.addEventListener('visibilitychange',visibility);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
  },[]);
  const fallback=()=>{setReady(false);setSupported(false);};
  return <div className="orbit" ref={ref} role="img" aria-label="A metallic orbital sculpture: silver and violet rings surrounding a blue sphere">
    <div className="orbit-fallback" style={{opacity:supported&&visible&&ready?0:1}}><i/><i/><i/><b/></div>
    {supported&&visible&&<div className="orbit-webgl"><SceneBoundary onFailure={fallback}><Scene paused={paused||!foreground} onReady={()=>setReady(true)} onLost={fallback}/></SceneBoundary></div>}
  </div>;
}
