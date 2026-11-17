import { services } from '@/content/site';
export const budgets = ['Let’s discuss', 'Under ₹25,000', '₹25,000 – ₹75,000', '₹75,000 – ₹2,00,000', '₹2,00,000+'];
export type Enquiry = { name: string; business: string; email: string; phone: string; service: string; budget: string; message: string; website: string };
export function validateEnquiry(value: unknown): { data?: Enquiry; error?: string } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { error: 'Please check your enquiry and try again.' };
  const input = value as Record<string, unknown>;
  const limits: Record<keyof Enquiry, number> = { name:100, business:150, email:160, phone:40, service:100, budget:80, message:4000, website:200 };
  const data = {} as Enquiry;
  for (const key of Object.keys(limits) as (keyof Enquiry)[]) {
    if (input[key] !== undefined && typeof input[key] !== 'string') return {error:'Please check the form fields.'};
    const item = typeof input[key] === 'string' ? input[key].trim() : '';
    if (item.length > limits[key]) return {error:'One of your entries is too long. Please shorten it and try again.'};
    data[key] = item;
  }
  if (!data.name || !data.message || !data.email || !data.service) return {error:'Please complete your name, email, service, and project description.'};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || /[\r\n]/.test(data.email+data.name)) return {error:'Please enter a valid name and email address.'};
  if (![...services.map(s=>s.title),'Something else / Let’s discuss'].includes(data.service)) return {error:'Please choose a service from the list.'};
  if (data.budget && !budgets.includes(data.budget)) return {error:'Please choose a budget from the list.'};
  return {data};
}
export function providerOutcome(payload: unknown): 'accepted' | 'activation' | 'failed' {
  if (!payload || typeof payload !== 'object') return 'failed';
  const result = payload as {success?:unknown; message?:unknown};
  // Activation may be returned as HTTP 200: never equate HTTP success with delivery.
  if (typeof result.message==='string' && /activat|confirm.*email/i.test(result.message)) return 'activation';
  return result.success===true || result.success==='true' ? 'accepted' : 'failed';
}
