import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '@/components/brand-logo';
import { brand } from '@/config/brand';
export default function NotFound(){return <main id="main" className="not-found"><Link href="/" aria-label="TechOrbit home"><BrandLogo/></Link><span className="eyebrow">404 / A LITTLE OUT OF ORBIT</span><h1>Let’s get you<br/>back on track.</h1><p>That page isn’t here. There’s plenty to explore back at the studio.</p><div><Link className="button primary" href="/"><ArrowLeft size={16}/> Back to TechOrbit</Link><a className="text-link" href={brand.whatsappUrl}>Talk to us <ArrowUpRight size={16}/></a></div></main>;}
