import { test, expect } from '@playwright/test';
import { validateEnquiry, providerOutcome } from '../src/lib/contact';
import { POST } from '../src/app/api/contact/route';
const enquiry={name:'Test Visitor',business:'Example',email:'test@example.com',phone:'',service:'Web development',budget:'Let’s discuss',message:'A business website',website:''};
test('provider responses cannot mistake false or activation for accepted mail',()=>{
  expect(providerOutcome({success:'false',message:'Unable to submit'})).toBe('failed');
  expect(providerOutcome({success:true,message:'This form needs activation'})).toBe('activation');
  expect(providerOutcome({success:'true',message:'Form successfully submitted'})).toBe('accepted');
  expect(providerOutcome(null)).toBe('failed');
  expect(validateEnquiry({...enquiry,email:'broken'}).error).toBeTruthy();
  expect(validateEnquiry({...enquiry,name:'Bad\r\nName'}).error).toBeTruthy();
});
test('API rejects malformed and cross-origin enquiries before contacting the provider',async()=>{
  const make=(body:unknown,origin='http://localhost:3001')=>new Request('http://localhost:3001/api/contact',{method:'POST',headers:{'Content-Type':'application/json',origin},body:JSON.stringify(body)});
  expect((await POST(make({...enquiry,service:'invented'}))).status).toBe(400);
  expect((await POST(make({...enquiry,website:'spam.example'}))).status).toBe(400);
  expect((await POST(make(enquiry,'https://other.example'))).status).toBe(403);
});
test('API respects provider acceptance, activation, and failure without sending actual mail',async()=>{
  const previous=global.fetch;
  let sent:Record<string,string>|undefined;
  let provider:unknown={success:'false',message:'This form needs Activation'};
  global.fetch=async(_url,options)=>{sent=JSON.parse(String(options?.body));return Response.json(provider);};
  const make=()=>new Request('http://localhost:3001/api/contact',{method:'POST',headers:{'Content-Type':'application/json','x-forwarded-for':'test-mail'},body:JSON.stringify(enquiry)});
  try{
    const activation=await POST(make());expect(activation.status).toBe(503);expect((await activation.json()).code).toBe('ACTIVATION_REQUIRED');
    provider={success:'false',message:'Service unavailable'};expect((await POST(make())).status).toBe(502);
    provider={success:'true',message:'Form submitted successfully'};expect((await POST(make())).status).toBe(200);
    expect(sent?.email).toBe('test@example.com');expect(sent?._replyto).toBe('test@example.com');expect(sent?.service).toBe('Web development');
    expect(sent?.message).toBe('A business website');
  }finally{global.fetch=previous;}
});
