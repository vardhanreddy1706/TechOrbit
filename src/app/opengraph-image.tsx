import { ImageResponse } from 'next/og';
import { brand } from '@/config/brand';
export const alt='TechOrbit — Big ideas. Beautifully built. Across India.';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'65px 75px',background:brand.colors.midnight,color:brand.colors.white}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:32,letterSpacing:-1}}>TechOrbit</span><span style={{fontSize:17,color:'#a9b9e2'}}>INDEPENDENT STUDIO · INDIA</span></div><div style={{display:'flex',flexDirection:'column',fontSize:91,letterSpacing:-5,lineHeight:1.04}}><span>Big ideas.</span><span style={{color:'#8d9dff'}}>Beautifully built.</span></div><div style={{display:'flex',fontSize:18,color:'#a9b9e2'}}>WEB · APPS · DESIGN · MOTION · BUILDING ACROSS INDIA</div></div>,size);}
