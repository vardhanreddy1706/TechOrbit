import type { Metadata, Viewport } from 'next';
import { brand } from '@/config/brand';
import { services } from '@/content/site';
import './globals.css';
const siteUrl=brand.siteUrl || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
export const viewport:Viewport={themeColor:[{media:'(prefers-color-scheme: dark)',color:brand.colors.midnight},{media:'(prefers-color-scheme: light)',color:'#fafbff'}]};
export const metadata:Metadata={
  title:'TechOrbit — Web, App & Creative Technology Studio in India',
  description:brand.description,
  applicationName:brand.name,
  metadataBase:new URL(siteUrl||'http://localhost:3000'),
  ...(siteUrl?{alternates:{canonical:'/'}}:{}),
  icons:{icon:brand.favicon,apple:brand.favicon},
  openGraph:{title:'TechOrbit — Big ideas. Beautifully built.',description:brand.description,type:'website',siteName:brand.name,locale:'en_IN',...(siteUrl?{url:siteUrl}:{}),images:[{url:'/opengraph-image',width:1200,height:630,alt:'TechOrbit — Building digital experiences across India'}]},
  twitter:{card:'summary_large_image',title:'TechOrbit — Big ideas. Beautifully built.',description:brand.description,images:['/opengraph-image']},
  robots:{index:process.env.VERCEL_ENV!=='preview',follow:true},
  category:'technology',
};
const structuredData={
  '@context':'https://schema.org','@type':'Organization',name:brand.name,description:brand.description,
  ...(siteUrl?{url:siteUrl,logo:`${siteUrl}${brand.logo}`}:{ }),
  email:brand.email,telephone:'+916309639767',sameAs:[brand.instagram],
  areaServed:{'@type':'Country',name:'India'},
  contactPoint:{'@type':'ContactPoint',telephone:'+916309639767',email:brand.email,contactType:'customer service',areaServed:'IN'},
  hasOfferCatalog:{'@type':'OfferCatalog',name:'Creative technology services',itemListElement:services.map(s=>({'@type':'Offer',itemOffered:{'@type':'Service',name:s.title,description:s.text,areaServed:{'@type':'Country',name:'India'}}}))},
};
const themeScript="try{var t=localStorage.getItem('techorbit-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}";
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en-IN" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body><a className="skip-link" href="#main">Skip to content</a><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,'\\u003c')}}/>{children}</body></html>;
}
