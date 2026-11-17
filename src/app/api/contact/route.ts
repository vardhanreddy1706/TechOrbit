import { brand } from '@/config/brand';
import { validateEnquiry, providerOutcome } from '@/lib/contact';
export const runtime = 'nodejs';
const attempts = new Map<string, { count: number; until: number }>();
const json = (body: object, status=200) => Response.json(body, {status, headers:{'Cache-Control':'no-store'}});
export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) return json({error:'Please submit the form from this website.'},415);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return json({error:'Please submit the form from this website.'},403);
  const text = await request.text();
  if (text.length > 18000) return json({error:'Please shorten your enquiry and try again.'},413);
  let body: unknown;
  try { body=JSON.parse(text); } catch { return json({error:'The enquiry could not be read. Please try again.'},400); }
  const validation=validateEnquiry(body);
  if (!validation.data) return json({error:validation.error},400);
  const data=validation.data;
  if (data.website) return json({error:'We couldn’t submit this enquiry. Please contact us directly.'},400);
  // A small per-instance spam guard; not a distributed rate limiter.
  const key=request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
  const now=Date.now();
  for(const [ip,state] of attempts) if(state.until<now) attempts.delete(ip);
  const state=attempts.get(key);
  if(state && state.count>=5) return json({error:'Please wait a few minutes before sending another enquiry, or use WhatsApp.'},429);
  if(attempts.size>=2000) return json({error:'We’re receiving a lot of messages. Please try again shortly or use WhatsApp.'},503);
  attempts.set(key,{count:(state?.count||0)+1,until:state?.until||now+10*60*1000});
  try {
    const response=await fetch(brand.contact.endpoint,{
      method:'POST',
      headers:{'Content-Type':'application/json',Accept:'application/json',Referer:new URL('/',request.url).href},
      body:JSON.stringify({
        name:data.name,email:data.email,business:data.business||'Not provided',phone:data.phone||'Not provided',
        service:data.service,budget:data.budget||'Let’s discuss',message:data.message,
        _subject:`TechOrbit project enquiry — ${data.service}`,_replyto:data.email,_template:'table',
        _url:new URL('/#contact',request.url).href,
      }),
      signal:AbortSignal.timeout(20000),cache:'no-store',
    });
    const result=providerOutcome(await response.json());
    if(result==='activation') return json({error:'Our email form is awaiting activation. Please send your enquiry on WhatsApp or email us directly for now.',code:'ACTIVATION_REQUIRED'},503);
    if(!response.ok || result!=='accepted') return json({error:'The email service could not accept your enquiry. Your details are still here; please try again or contact us on WhatsApp.'},502);
    return json({message:'Your enquiry has been submitted. Thank you for telling us about your idea — we’ll get back to you by email.'});
  } catch {
    return json({error:'We couldn’t confirm your submission. Your details are still here. Please try again shortly, or contact us on WhatsApp.'},502);
  }
}
