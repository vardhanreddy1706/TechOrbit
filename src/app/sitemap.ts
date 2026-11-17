import type { MetadataRoute } from 'next';
import { brand } from '@/config/brand';
export default function sitemap():MetadataRoute.Sitemap {
  const siteUrl=brand.siteUrl||(process.env.VERCEL_PROJECT_PRODUCTION_URL?`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`:'');
  return siteUrl?[{url:siteUrl,changeFrequency:'monthly',priority:1}]:[];
}
