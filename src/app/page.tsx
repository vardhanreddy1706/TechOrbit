'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, ArrowUp, Plus, Minus, Sun, Moon, Menu, X, Pause, Play, MessageCircle, Mail, Check, Globe2, Expand, ChevronRight } from 'lucide-react';
import { brand } from '@/config/brand';
import { services, projects, processSteps, faqs, type ToolId } from '@/content/site';
import { Orbit } from '@/components/orbit';
import { BrandLogo } from '@/components/brand-logo';
import { ContactForm } from '@/components/contact-form';
import { ToolLogo } from '@/components/tool-logo';
import { InstagramIcon } from '@/components/social-icon';
import { IndiaNetwork } from '@/components/india-network';
import { MotionDesign } from '@/components/motion-design';
import { ProjectFilm } from '@/components/project-film';

const nav=[['Work','#work'],['Services','#services'],['Across India','#india'],['Studio','#studio']];
const featuredTools: ToolId[]=['react','nextjs','typescript','nodejs','mongodb','figma','aftereffects','docker'];
export default function Home() {
  const [theme,setTheme]=useState('dark');
  const [themeReady,setThemeReady]=useState(false);
  const [menu,setMenu]=useState(false);
  const [paused,setPaused]=useState(false);
  const [reduced,setReduced]=useState(false);
  const [activeSection,setActiveSection]=useState('');
  const [step,setStep]=useState(0);
  const [selectedService,setSelectedService]=useState('');
  const [preview,setPreview]=useState<(typeof projects)[number]|null>(null);
  const [showQuickContact,setShowQuickContact]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null);
  const menuButton=useRef<HTMLButtonElement>(null);
  const menuRef=useRef<HTMLElement>(null);

  useEffect(()=>{
    try {const stored=localStorage.getItem('techorbit-theme'); if(stored==='light'||stored==='dark')setTheme(stored);}catch{}
    setThemeReady(true);
    const mq=matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setReduced(mq.matches);update();mq.addEventListener('change',update);
    return()=>mq.removeEventListener('change',update);
  },[]);
  useEffect(()=>{if(!themeReady)return;document.documentElement.dataset.theme=theme;try{localStorage.setItem('techorbit-theme',theme);}catch{}},[theme,themeReady]);
  useEffect(()=>{document.documentElement.dataset.motion=paused||reduced?'paused':'running';},[paused,reduced]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}),{threshold:.12});
    document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));
    const sections=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActiveSection(entry.target.id);}),{rootMargin:'-15% 0px -60% 0px'});
    document.querySelectorAll('main section[id]').forEach(el=>sections.observe(el));
    const contact=new IntersectionObserver(([entry])=>setShowQuickContact(!entry.isIntersecting&&window.scrollY>450),{threshold:0});
    const contactElement=document.querySelector('#contact');if(contactElement)contact.observe(contactElement);
    const scroll=()=>setShowQuickContact(window.scrollY>450 && (document.querySelector('#contact')?.getBoundingClientRect().top||0)>window.innerHeight);
    window.addEventListener('scroll',scroll,{passive:true});
    return()=>{observer.disconnect();sections.disconnect();contact.disconnect();window.removeEventListener('scroll',scroll);};
  },[]);
  useEffect(()=>{
    if(!menu)return;
    const old=document.body.style.overflow;document.body.style.overflow='hidden';
    menuRef.current?.querySelector('a')?.focus();
    const keydown=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){setMenu(false);menuButton.current?.focus();}
      if(event.key==='Tab'){
        const links=menuRef.current?.querySelectorAll<HTMLAnchorElement>('a');
        if(!links?.length)return;
        if(!event.shiftKey&&document.activeElement===links[links.length-1]){event.preventDefault();menuButton.current?.focus();}
        if(event.shiftKey&&document.activeElement===links[0]){event.preventDefault();menuButton.current?.focus();}
      }
    };
    window.addEventListener('keydown',keydown);
    return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',keydown);};
  },[menu]);
  useEffect(()=>{if(preview&&!dialog.current?.open)dialog.current?.showModal();},[preview]);
  function closePreview(){dialog.current?.close();setPreview(null);}
  function enquire(service:string){setSelectedService(service);document.querySelector('#contact')?.scrollIntoView({behavior:reduced||paused?'instant':'smooth'});}
  const whatsapp=`${brand.whatsappUrl}?text=${encodeURIComponent('Hi TechOrbit! I’d like to discuss a project.')}`;

  return <>
    <div className="scroll-progress" aria-hidden="true"/>
    <header className="header">
      <a className="home-link" href="#top" aria-label="TechOrbit home"><BrandLogo/></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label,href])=><a key={href} href={href} aria-current={activeSection===href.slice(1)?'location':undefined}>{label}</a>)}</nav>
      <div className="header-actions"><button className="icon-button" aria-label={`Switch to ${theme==='dark'?'light':'dark'} theme`} onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={16}/></a><button ref={menuButton} className="icon-button mobile-menu-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="mobile-navigation" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
    </header>
    {menu&&<nav ref={menuRef} className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{[...nav,['Our process','#process'],['Let’s talk','#contact']].map(([label,href],i)=><a href={href} key={href} onClick={()=>setMenu(false)}><small>0{i+1}</small>{label}<ArrowUpRight size={25}/></a>)}<p>Independent thinking. All-India possibilities.</p></nav>}

    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-topline"><span><i className="status-dot"/> INDEPENDENT CREATIVE TECHNOLOGY STUDIO</span><a href="#india"><Globe2 size={12}/> MADE IN INDIA. BUILT FOR WHAT’S NEXT.</a></div>
        <div className="hero-layout">
          <div className="hero-copy"><p className="eyebrow">DESIGN WITH PURPOSE. TECHNOLOGY WITH POSSIBILITY.</p><h1 id="hero-title">Big ideas.<br/>Beautifully<br/><span>built.</span></h1><p className="hero-description">We build websites, applications, and digital experiences<br className="desktop-break"/> that feel right, work beautifully, and move you forward.</p><div className="hero-buttons"><a className="button primary" href="#work">Discover our work <ArrowUpRight size={18}/></a><a className="text-link" href="#contact">Tell us your idea <ArrowRight size={17}/></a></div><a className="hero-india" href="#india"><span className="india-flag"><i/><i/><i/></span>One creative partner. Across India.<ChevronRight size={13}/></a></div>
          <div className="hero-art"><Orbit paused={paused||reduced}/><div className="art-caption"><span className="tiny-cross">+</span><span>A DIFFERENT PERSPECTIVE.<br/>A WORLD OF POSSIBILITIES.</span></div><button className="motion-button" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?'Play animations':'Pause animations'}>{paused?<Play size={12}/>:<Pause size={12}/>} {paused||reduced?'STILL BY CHOICE':'IDEAS IN MOTION'}</button></div>
        </div>
        <div className="hero-bottom"><a href="#work"><ArrowDown size={14}/> TAKE A CLOSER LOOK</a><span>STRATEGY <i/> DESIGN <i/> DEVELOPMENT <i/> GROWTH</span><span>YOUR NEXT CHAPTER STARTS HERE ↗</span></div>
      </section>

      <div className="marquee" aria-label="We build across India"><div className="marquee-track" aria-hidden="true">{[0,1].map(n=><div className="marquee-copy" key={n}><span>WE BUILD ACROSS INDIA</span><b>✳</b><span className="outline-type">IDEAS WITHOUT DISTANCE</span><b>✳</b></div>)}</div></div>

      <section className="section work" id="work" aria-labelledby="work-title"><div className="section-label"><span>01 — SELECTED WORK</span><span>REAL PROJECTS. CONSIDERED EXPERIENCES.</span></div><div className="section-heading" data-reveal><h2 id="work-title">Good ideas.<br/><em>Out in the world.</em></h2><p>Creators. Agriculture. Financial technology.<br/>Different worlds, the same care in the details.</p></div>
        <div className="work-grid">{projects.map((project,i)=><article className={`project project-${project.id}`} key={project.id} style={{'--project-accent':project.accent} as React.CSSProperties} data-reveal>
          {project.video?<ProjectFilm project={project} paused={paused} onExpand={()=>setPreview(project)}/>:<button className="project-preview" onClick={()=>setPreview(project)} aria-label={`Enlarge ${project.name} screenshot`}><div className="browser-bar" aria-hidden="true"><span className="browser-dots"><i/><i/><i/></span><span>{project.name.toLowerCase().replace(' ','')} / the experience</span><Expand size={13}/></div><div className="project-image"><Image src={project.image} width={project.width} height={project.height} alt={project.imageAlt} sizes="(max-width: 760px) 90vw, 88vw" quality={88}/><span className="preview-action">Explore the details <Expand size={14}/></span></div></button>}
          <div className="project-meta"><div><span className="eyebrow">0{i+1} / {project.category}</span><h3>{project.name}<span>↗</span></h3><p className="project-caption">{project.caption}</p></div><div><p>{project.description}</p><div className="project-tags">{project.tags.map(t=><span key={t}>{t}</span>)}</div><div className="project-links"><button className="text-link" onClick={()=>setPreview(project)}>{project.video?'Watch project film':'View full screenshot'} <Expand size={13}/></button>{project.url?<a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight size={16}/></a>:<button className="text-link" onClick={()=>enquire('Web development')}>Discuss a similar project <ArrowUpRight size={16}/></button>}</div></div></div>
        </article>)}</div>
        <a className="next-project" href="#contact"><span>THE NEXT THING WE’RE EXCITED ABOUT?</span><strong>It could be your idea.</strong><span className="round-arrow"><ArrowUpRight size={24}/></span></a>
      </section>

      <section className="section services" id="services" aria-labelledby="services-title"><div className="section-label"><span>02 — OUR EXPERTISE</span><span>FROM FIRST THOUGHT TO WHAT’S NEXT</span></div><div className="section-heading" data-reveal><h2 id="services-title">Everything it takes.<br/><em>Nothing off the shelf.</em></h2><p>Creative thinking and technical craft.<br/>One team to connect the whole picture.</p></div>
        <div className="service-list">{services.map((service,i)=><details className="service" name="services" key={service.title} style={{'--service-color':service.color} as React.CSSProperties}>
          <summary><span className="service-number">0{i+1}</span><div className="service-heading"><h3>{service.title}</h3><span>{service.subtitle}</span></div><div className="service-tool-icons" aria-label="Relevant technologies and platforms">{service.tools.slice(0,3).map(id=><ToolLogo id={id} key={id}/>)}</div><Plus className="service-plus" size={20}/><Minus className="service-minus" size={20}/></summary>
          <div className="service-content"><div><p>{service.text}</p><div className="service-tool-labels">{service.tools.map(id=><ToolLogo id={id} key={id} label/>)}</div></div><ul>{service.items.map(item=><li key={item}><Check size={14}/>{item}</li>)}</ul><button className="text-link" onClick={()=>enquire(service.title)}>Let’s discuss {service.short.toLowerCase()} <ArrowUpRight size={16}/></button></div>
        </details>)}</div>
        <div className="toolbelt"><span className="eyebrow">THE TOOLS BEHIND THE CRAFT</span><div>{featuredTools.map(id=><ToolLogo id={id} key={id} label/>)}</div></div>
      </section>

      <section className="india-section" id="india" aria-labelledby="india-title"><div className="section india-inner"><div className="section-label"><span>03 — CLOSE, WHEREVER YOU ARE</span><span>INDEPENDENT STUDIO. NATIONWIDE REACH.</span></div><div className="india-grid"><div data-reveal><span className="india-kicker"><span className="india-flag"><i/><i/><i/></span> PROUDLY BUILDING FROM INDIA</span><h2 id="india-title">Across India.<br/><em>In your corner.</em></h2><p>From a local business taking its first step online to a founder building the next big thing. Wherever you’re based in India, we’re ready to build with you.</p><div className="india-promises"><span><Check size={14}/> Direct conversations</span><span><Check size={14}/> Shared project previews</span><span><Check size={14}/> Clear progress updates</span></div><a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Let’s connect <ArrowUpRight size={17}/></a></div><IndiaNetwork/></div></div></section>

      <section className="section motion-section" id="motion" aria-labelledby="motion-title"><div className="motion-grid"><div className="motion-art" data-reveal><MotionDesign/></div><div className="motion-copy" data-reveal><span className="eyebrow">DESIGN THAT DOES MORE THAN SIT STILL</span><h2 id="motion-title">A little movement.<br/><em>A lasting feeling.</em></h2><p>Product films. Expressive interfaces. A reel that stops the scroll. We bring a considered sense of motion to the moments that matter.</p><div className="motion-disciplines"><span>Motion graphics</span><span>Promotional films</span><span>Creative campaigns</span><span>Interactive experiences</span></div><button className="text-link" onClick={()=>enquire('Content & motion design')}>Put your brand in motion <ArrowUpRight size={16}/></button></div></div></section>

      <section className="section studio" id="studio" aria-labelledby="studio-title"><div className="section-label"><span>04 — MEET TECHORBIT</span><span>GOOD PEOPLE. THOUGHTFUL WORK.</span></div><div className="studio-grid"><div data-reveal><h2 id="studio-title">Small enough to care.<br/><em>Curious enough<br/>to go further.</em></h2><p className="studio-intro">We’re an independent creative technology studio. We bring design, development, and digital storytelling together to help ambitious businesses move forward.</p><a className="text-link" href="#contact">Meet your next creative partner <ArrowUpRight size={16}/></a></div><div className="principles" data-reveal>{[['Your goals come first.','We start with what your business needs, then shape the experience around it.'],['Clear from the beginning.','Direct communication, transparent scope, and pricing discussed before work starts.'],['Craft, all the way through.','The little details matter. So do performance, accessibility, and how it feels on a phone.'],['Here beyond the launch.','Deployment, maintenance, and improvements from people who understand your project.']].map(([title,text],i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="section process" id="process" aria-labelledby="process-title"><div className="section-label"><span>05 — HOW WE GET THERE</span><span>COLLABORATIVE AT EVERY STEP</span></div><div className="section-heading" data-reveal><h2 id="process-title">A clear path.<br/><em>Room for possibility.</em></h2><p>No mystery in the middle.<br/>You’re part of the process from day one.</p></div><div className="process-nav" role="tablist" aria-label="Project process">{processSteps.map(([title],i)=><button key={title} id={`step-${i}`} role="tab" aria-selected={step===i} aria-controls="process-panel" tabIndex={step===i?0:-1} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?5:(i+(e.key==='ArrowRight'?1:5))%6;setStep(next);document.getElementById(`step-${next}`)?.focus();}}} onClick={()=>setStep(i)}><span>0{i+1}</span>{title}<i/></button>)}</div><div className="process-panel" id="process-panel" role="tabpanel" aria-labelledby={`step-${step}`} tabIndex={0}><span className="process-big-number" aria-hidden="true">0{step+1}</span><div key={step} className="process-detail"><span className="eyebrow">{processSteps[step][0].toUpperCase()}</span><h3>{processSteps[step][1]}</h3><p>{processSteps[step][2]}</p></div><button className="round-arrow" aria-label="Next process step" onClick={()=>setStep((step+1)%6)}><ArrowRight size={23}/></button></div></section>

      <section className="social-section"><div className="section social-inner"><div><InstagramIcon width="27" height="27"/><span className="eyebrow">A LITTLE CLOSER TO OUR WORLD</span><h2>Ideas. Experiments.<br/><em>What’s next.</em></h2></div><div><p>Follow the work, the process, and the things<br/>we’re excited to put into the world.</p><a className="social-handle" href={brand.instagram} target="_blank" rel="noopener noreferrer">{brand.instagramHandle}<ArrowUpRight size={27}/></a></div></div></section>

      <section className="section faq-section" id="faq" aria-labelledby="faq-title"><div className="faq-grid"><div data-reveal><span className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</span><h2 id="faq-title">Good questions.<br/><em>Clear answers.</em></h2><p>Something else on your mind?</p><a href={whatsapp} className="text-link" target="_blank" rel="noopener noreferrer">Just ask us <ArrowUpRight size={16}/></a></div><div className="faq-list">{faqs.map(([q,a])=><details key={q} name="faqs"><summary>{q}<Plus className="service-plus" size={17}/><Minus className="service-minus" size={17}/></summary><p>{a}</p></details>)}</div></div></section>

      <section className="section contact" id="contact" aria-labelledby="contact-title"><div className="section-label"><span>06 — YOUR NEXT CHAPTER</span><span>LET’S START WITH A CONVERSATION</span></div><div className="contact-heading" data-reveal><span className="eyebrow"><i className="status-dot"/> OPEN TO NEW IDEAS. ACROSS INDIA.</span><h2 id="contact-title">Let’s make<br/>something <em>matter.</em><ArrowUpRight className="contact-arrow" strokeWidth={1.15}/></h2></div><div className="contact-grid"><div className="contact-details"><p>An ambitious plan or an early what-if.<br/>We’d love to hear what’s on your mind.</p><a className="whatsapp-direct" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={22}/><span>Start with a WhatsApp chat<small>{brand.whatsapp}</small></span><ArrowUpRight size={18}/></a><a href={brand.emailUrl}><Mail size={18}/><span>{brand.email}</span><ArrowUpRight size={16}/></a><a href={brand.instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon/><span>{brand.instagramHandle}</span><ArrowUpRight size={16}/></a><span className="contact-location"><Globe2 size={14}/> Based in India. Connected everywhere.</span></div><ContactForm selectedService={selectedService}/></div></section>
    </main>

    <footer className="footer"><div className="footer-top"><div><a href="#top" aria-label="TechOrbit home"><BrandLogo/></a><p>Creative thinking.<br/>Technology in motion.<br/><span>Building across India.</span></p></div><div><span>EXPLORE</span><a href="#work">Our work</a><a href="#services">Our expertise</a><a href="#india">Across India</a><a href="#studio">The studio</a></div><div><span>CONNECT</span><a href={brand.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={12}/></a><a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={12}/></a><a href={brand.emailUrl}>Email <ArrowUpRight size={12}/></a><a href="#faq">FAQs</a></div><div className="footer-controls"><a href="#top" className="back-top">BACK TO TOP <ArrowUp size={18}/></a><button onClick={()=>setPaused(!paused)}>{paused?<Play size={12}/>:<Pause size={12}/>} {paused?'Resume motion':'Pause motion'}</button></div></div><div className="footer-wordmark" aria-hidden="true">TechOrbit<span>↗</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} TechOrbit. All rights reserved.</span><span>INDEPENDENT BY DESIGN. CONNECTED BY POSSIBILITY.</span><button onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={13}/>:<Moon size={13}/>} {theme==='dark'?'Light mode':'Dark mode'}</button></div></footer>

    {showQuickContact&&!menu&&<div className="quick-contact"><a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with TechOrbit on WhatsApp"><MessageCircle size={21}/><span>Have an idea?</span></a><a href="#contact" className="quick-enquiry">Let’s talk <ArrowUpRight size={16}/></a></div>}
    <dialog ref={dialog} className="project-dialog" onCancel={()=>setPreview(null)} onClick={e=>{if(e.target===e.currentTarget)closePreview();}} aria-labelledby="preview-title"><div className="dialog-top"><h2 id="preview-title">{preview?.name} <span>{preview?.video?'Project film · 10 seconds':'Project screenshot'}</span></h2><button className="icon-button" onClick={closePreview} aria-label="Close project preview"><X/></button></div>{preview&&(preview.video?<ProjectFilm project={preview} large/>:<img className="dialog-image" src={preview.image} width={preview.width} height={preview.height} alt={preview.imageAlt}/>)}<p>Actual project interface · Supplied by TechOrbit</p></dialog>
  </>;
}
