'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, Expand, Play } from 'lucide-react';
import type { Project } from '@/content/site';
import './project-film.css';

export function ProjectFilm({project,paused=false,onExpand,large=false}:{project:Project;paused?:boolean;onExpand?:()=>void;large?:boolean}) {
  const video=useRef<HTMLVideoElement>(null);
  const [started,setStarted]=useState(false);
  const [failed,setFailed]=useState(false);
  const descriptionId=useId();
  useEffect(()=>{
    const element=video.current;
    if(!element)return;
    const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)element.pause();},{threshold:.05});
    observer.observe(element);
    const visibility=()=>{if(document.visibilityState!=='visible')element.pause();};
    document.addEventListener('visibilitychange',visibility);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);element.pause();};
  },[]);
  useEffect(()=>{if(paused)video.current?.pause();},[paused]);
  async function play(){
    setFailed(false);
    try{await video.current?.play();}catch(error){if(!(error instanceof DOMException&&error.name==='AbortError'))setFailed(true);}
  }
  return <div className={`project-preview project-film ${large?'film-large':''}`}>
    {!large&&<div className="browser-bar"><span className="browser-dots" aria-hidden="true"><i/><i/><i/></span><span>{project.name} / {project.durationSeconds}-second project film</span><button className="film-expand" aria-label={`Enlarge ${project.name} film`} onClick={()=>{video.current?.pause();onExpand?.();}}><Expand size={14}/></button></div>}
    <div className="film-stage">
      <video ref={video} controls={started} preload="none" playsInline muted loop poster={project.image} width={project.width} height={project.height} aria-label={`${project.name} project film`} aria-describedby={descriptionId} onPlay={()=>{setStarted(true);setFailed(false);}} onError={()=>setFailed(true)}>
        {project.mobileVideo&&<source src={project.mobileVideo} media="(max-width: 760px)" type="video/mp4"/>}
        <source src={project.video} type="video/mp4"/>
        Your browser doesn’t support this video. <a href={project.video}>Open the project film</a>.
      </video>
      {!started&&!failed&&<button className="film-play-overlay" aria-label={`Play ${project.name} film`} onClick={play}><span className="film-play-icon"><Play size={25} fill="currentColor" strokeWidth={1}/></span><span>WATCH THE EXPERIENCE <small>{project.durationSeconds} SECONDS · SOUND OFF</small></span></button>}
      {failed&&<div className="film-error" role="status"><p>The film couldn’t load. You can still explore the project.</p><div><a href={project.video} className="text-link">Open video <ArrowUpRight size={15}/></a>{project.url&&<a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight size={15}/></a>}</div></div>}
    </div>
    <p className="sr-only" id={descriptionId}>{project.videoDescription}</p>
  </div>;
}
