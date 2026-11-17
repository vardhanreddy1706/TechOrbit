'use client';
import { useRef, useState } from 'react';
import { ArrowUpRight, ArrowLeft, Check, LoaderCircle } from 'lucide-react';
import { brand } from '@/config/brand';
import { services } from '@/content/site';
import { budgets } from '@/lib/contact';
export function ContactForm({ selectedService }: { selectedService?: string }) {
  const [state,setState]=useState<'idle'|'sending'|'success'|'error'>('idle');
  const [message,setMessage]=useState('');
  const sending=useRef(false);
  const statusRef=useRef<HTMLDivElement>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(sending.current)return;
    const form=event.currentTarget;
    const payload=Object.fromEntries(new FormData(form).entries());
    sending.current=true;setState('sending');setMessage('');
    try {
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(25000)});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||'Please try again or contact us directly.');
      setState('success');setMessage(result.message);form.reset();
    } catch(error) {
      setState('error');setMessage(error instanceof Error && !['TimeoutError','AbortError','TypeError','SyntaxError'].includes(error.name) ? error.message : 'We couldn’t confirm your submission. Your details are still here. Please try again shortly or contact us directly.');
    } finally {sending.current=false;setTimeout(()=>statusRef.current?.focus(),50);}
  }
  if(state==='success')return <div className="form-success" ref={statusRef} role="status" tabIndex={-1}><span className="success-mark"><Check size={25}/></span><span className="eyebrow">A GREAT PLACE TO START</span><h3>Thanks for reaching out.</h3><p>{message}</p><button className="text-link" onClick={()=>{setState('idle');setMessage('');}}><ArrowLeft size={16}/> Send another enquiry</button></div>;
  return <form className="contact-form" onSubmit={submit} aria-label="Project enquiry" aria-busy={state==='sending'}>
    <fieldset disabled={state==='sending'}><legend className="sr-only">Tell us about your project</legend>
      <div className="form-grid">
        <label>Your name <span>*</span><input name="name" autoComplete="name" required placeholder="Your full name" maxLength={100}/></label>
        <label>Business name<input name="business" autoComplete="organization" placeholder="Your business or brand" maxLength={150}/></label>
        <label>Email address <span>*</span><input type="email" name="email" autoComplete="email" required placeholder="you@company.com" maxLength={160}/></label>
        <label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" placeholder="+91" maxLength={40}/></label>
        <label>What can we help with? <span>*</span><select name="service" key={selectedService||'default'} required defaultValue={selectedService||''}><option value="" disabled>Select a service</option>{services.map(s=><option key={s.title}>{s.title}</option>)}<option>Something else / Let’s discuss</option></select></label>
        <label>Budget range<select name="budget" defaultValue="Let’s discuss">{budgets.map(b=><option key={b}>{b}</option>)}</select></label>
      </div>
      <label className="message-label">A little about your idea <span>*</span><textarea name="message" required rows={4} placeholder="What are you hoping to build? Tell us about your goals, audience, or timeline." maxLength={4000}/></label>
      <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <div className="form-bottom"><p>We’ll use your details to respond to your enquiry.<br/>No mailing lists. Just a conversation.</p><button className="button primary" type="submit">{state==='sending'?<>Sending <LoaderCircle className="spinner" size={18}/></>:<>Send enquiry <ArrowUpRight size={18}/></>}</button></div>
    </fieldset>
    {state==='error'&&<div className="form-error" ref={statusRef} role="alert" tabIndex={-1}><p>{message}</p><a href={`${brand.whatsappUrl}?text=${encodeURIComponent('Hi TechOrbit, I’d like to discuss a project.')}`} target="_blank" rel="noopener noreferrer">Continue on WhatsApp <ArrowUpRight size={15}/></a><a href={brand.emailUrl}>Email us directly <ArrowUpRight size={15}/></a></div>}
  </form>;
}
