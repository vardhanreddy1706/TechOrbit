import { writeFile, mkdir } from 'node:fs/promises';
const root = new URL('../public/', import.meta.url);
const icons = {
 react: 'react/react-original.svg', nextjs: 'nextjs/nextjs-original.svg', typescript: 'typescript/typescript-original.svg',
 tailwindcss: 'tailwindcss/tailwindcss-original.svg', nodejs: 'nodejs/nodejs-original.svg', mongodb: 'mongodb/mongodb-original.svg',
 python: 'python/python-original.svg', google: 'google/google-original.svg', git: 'git/git-original.svg',
 figma: 'figma/figma-original.svg', aftereffects: 'aftereffects/aftereffects-original.svg', premierepro: 'premierepro/premierepro-original.svg',
 photoshop: 'photoshop/photoshop-original.svg', docker: 'docker/docker-original.svg', vercel: 'vercel/vercel-original.svg',
 java: 'java/java-original.svg', spring: 'spring/spring-original.svg', angular: 'angular/angular-original.svg',
};
await mkdir(new URL('tools/',root),{recursive:true});
await mkdir(new URL('licenses/',root),{recursive:true});
const sources = Object.entries(icons).map(([name,path])=>[name,`https://raw.githubusercontent.com/devicons/devicon/v2.17.0/icons/${path}`]);
sources.push(['meta','https://cdn.simpleicons.org/meta/0866FF'],['instagram','https://cdn.simpleicons.org/instagram/E4405F']);
const results = await Promise.allSettled(sources.map(async ([name,url])=>{
 const response=await fetch(url,{signal:AbortSignal.timeout(25000)});
 if(!response.ok)throw new Error(`${name}: HTTP ${response.status}`);
 const svg=await response.text();
 if(!svg.includes('<svg'))throw new Error(`${name}: not SVG`);
 await writeFile(new URL(`tools/${name}.svg`,root),svg);
 return name;
}));
for(let i=0;i<results.length;i++)console.log(sources[i][0],results[i].status,results[i].status==='rejected'?String(results[i].reason):'');
const license=await fetch('https://raw.githubusercontent.com/devicons/devicon/v2.17.0/LICENSE');
await writeFile(new URL('licenses/devicon-MIT.txt',root),await license.text());
await writeFile(new URL('licenses/ASSET-SOURCES.txt',root),'Project screenshots: supplied by TechOrbit, used unmodified.\nTechOrbit logos: supplied by TechOrbit, used unmodified.\nTechnology logos: Devicon v2.17.0 (MIT), https://github.com/devicons/devicon/tree/v2.17.0\nMeta and Instagram glyphs: Simple Icons CDN, https://simpleicons.org/ (CC0 collection; trademarks belong to their owners).\nLogos identify relevant tools and platforms, not partners or endorsements.\n');
if(results.some(r=>r.status==='rejected'))process.exitCode=1;
