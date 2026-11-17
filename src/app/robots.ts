import type { MetadataRoute } from 'next';
import { brand } from '@/config/brand';
export default function robots():MetadataRoute.Robots {
  const siteUrl=brand.siteUrl||(process.env.VERCEL_PROJECT_PRODUCTION_URL?`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`:'');
  return {rules:{userAgent:'*',...(process.env.VERCEL_ENV==='preview'?{disallow:'/'}:{allow:'/',disallow:'/api/'})},...(siteUrl?{sitemap:`${siteUrl}/sitemap.xml`}:{})};
}
