import { brand } from '@/config/brand';
export function BrandLogo() {
  return <span className={`brand-logo ${brand.squareLogoCanvas ? 'square-canvas' : ''}`} aria-label={brand.name}>
    <img className="logo-dark" src={brand.logo} alt="" width="1080" height="1080" decoding="async"/>
    <img className="logo-light" src={brand.lightLogo} alt="" width="1080" height="1080" decoding="async"/>
  </span>;
}
