import { test, expect } from '@playwright/test';

test('Matrix Missions plays an exact ten-second film and pauses offscreen',async({page})=>{
  await page.goto('/');
  const project=page.locator('.project-matrixmissions');
  await project.scrollIntoViewIfNeeded();
  const film=project.locator('video');
  await expect(project.getByRole('heading',{name:'Matrix Missions'})).toBeVisible();
  await expect(project.getByRole('link',{name:'Visit website'})).toHaveAttribute('href','https://matrixmissions.in');
  await expect(film).toHaveAttribute('preload','none');
  expect(await film.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
  await project.getByRole('button',{name:'Play Matrix Missions film'}).click();
  await expect.poll(()=>film.evaluate(v=>(v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1);
  const media=await film.evaluate(v=>{const video=v as HTMLVideoElement;return{duration:video.duration,width:video.videoWidth,muted:video.muted,controls:video.controls,src:video.currentSrc};});
  expect(media.duration).toBeCloseTo(10,1);
  expect(media.width).toBe(1600);
  expect(media.muted&&media.controls).toBe(true);
  expect(media.src).toContain('matrix-missions-highlight.mp4');
  await page.locator('#services').scrollIntoViewIfNeeded();
  await expect.poll(()=>film.evaluate(v=>(v as HTMLVideoElement).paused)).toBe(true);
  await project.getByRole('button',{name:'Enlarge Matrix Missions film'}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').locator('video')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
test('phone visitors receive the smaller film with a responsive player',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  const project=page.locator('.project-matrixmissions');
  await project.getByRole('button',{name:'Play Matrix Missions film'}).click();
  const film=project.locator('video');
  await expect.poll(()=>film.evaluate(v=>(v as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(2);
  const media=await film.evaluate(v=>({width:(v as HTMLVideoElement).videoWidth,src:(v as HTMLVideoElement).currentSrc,duration:(v as HTMLVideoElement).duration}));
  expect(media.src).toContain('matrix-missions-highlight-mobile.mp4');
  expect(media.width).toBe(960);expect(media.duration).toBeCloseTo(10,1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('a failed video offers a real project link instead of a blank player',async({page})=>{
  await page.route('**/projects/*.mp4',route=>route.abort());
  await page.goto('/');
  const project=page.locator('.project-matrixmissions');
  await project.getByRole('button',{name:'Play Matrix Missions film'}).click();
  await expect(project.getByRole('status')).toContainText('film couldn’t load');
  await expect(project.getByRole('status').getByRole('link',{name:'Visit website'})).toHaveAttribute('href','https://matrixmissions.in');
});
test('canonical metadata, social URLs and sitemap use the purchased domain',async({page,request})=>{
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://techorbit26.site');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content','https://techorbit26.site');
  expect(await (await request.get('/sitemap.xml')).text()).toContain('<loc>https://techorbit26.site</loc>');
  expect(await (await request.get('/robots.txt')).text()).toContain('https://techorbit26.site/sitemap.xml');
});
