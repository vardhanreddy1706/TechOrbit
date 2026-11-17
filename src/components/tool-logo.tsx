import { tools, type ToolId } from '@/content/site';
export function ToolLogo({ id, label = false }: { id: ToolId; label?: boolean }) {
  const tool = tools[id];
  return <span className={`tool-logo ${label ? 'with-label' : ''}`} title={tool.name}>
    <span className={`tool-glyph ${id==='nextjs'||id==='vercel'?'mono-glyph':''}`}><img src={`/tools/${tool.icon}.svg`} width="22" height="22" alt={label ? '' : tool.name} loading="lazy" decoding="async"/></span>
    {label && <span>{tool.name}</span>}
  </span>;
}
