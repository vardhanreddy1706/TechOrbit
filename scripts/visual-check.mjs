import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',error=>errors.push(error.message));
await mkdir('previews',{recursive:true});
await page.goto(process.env.TEST_BASE_URL||'http://127.0.0.1:3000',{waitUntil:'networkidle'});
await page.emulateMedia({reducedMotion:'reduce'});
await page.evaluate(async()=>{await document.fonts.ready;});
// Visit each section so native lazy-loaded images have actually been requested.
for(const section of await page.locator('main section[id]').all()){
 await section.scrollIntoViewIfNeeded();
 await page.waitForTimeout(130);
}
await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
await page.locator('img[loading="lazy"]').evaluateAll(async imgs=>{imgs.forEach(img=>{img.loading='eager';});await Promise.all(imgs.map(img=>img.decode().catch(()=>{})));});
await page.waitForTimeout(1200);
await page.screenshot({path:'previews/dark-desktop.png',fullPage:true});
await page.screenshot({path:'previews/dark-hero.png'});
await page.getByRole('button',{name:'Switch to light theme'}).click();
await page.screenshot({path:'previews/light-desktop.png',fullPage:true});
await page.screenshot({path:'previews/light-hero.png'});
await page.setViewportSize({width:390,height:844});
await page.screenshot({path:'previews/light-mobile.png',fullPage:true});
await page.getByRole('button',{name:'Switch to dark theme'}).click();
await page.screenshot({path:'previews/dark-mobile.png',fullPage:true});
const brokenImages=await page.locator('img').evaluateAll(els=>els.filter(img=>img.complete&&img.naturalWidth===0).map(img=>img.getAttribute('src')));
console.log(JSON.stringify({pageErrors:errors,brokenImages,webglCanvases:await page.locator('.orbit-webgl canvas').count()}));
await browser.close();if(errors.length||brokenImages.length)process.exitCode=1;
