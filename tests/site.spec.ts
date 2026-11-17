import { test, expect } from '@playwright/test';

test('theme persists, the real screenshots open, service enquiries are prefilled',async({page})=>{
  await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Beautifully');
  await page.getByRole('button',{name:'Switch to light theme'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await expect(page.locator('.brand-logo .logo-light').first()).toHaveCSS('mix-blend-mode','multiply');
  await page.getByRole('button',{name:'Enlarge RapidReel screenshot'}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src','/projects/rapidreel.png');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.locator('summary').filter({hasText:'Web development'}).click();
  await expect(page.getByText('E-commerce websites',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Let’s discuss web'}).click();
  await expect(page.getByLabel('What can we help with?')).toHaveValue('Web development');
});
test('mobile navigation, keyboard process, and FAQs are usable',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.getByRole('button',{name:'Open navigation'}).click();
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Across India'}).click();
  await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toHaveCount(0);
  await page.getByRole('tab',{name:'01 Discover'}).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tabpanel')).toContainText('A clear direction.');
  await page.locator('#faq summary').first().click();
  await expect(page.getByText('Yes. We collaborate remotely',{exact:false})).toBeVisible();
});
async function fillForm(page:import('@playwright/test').Page){
  await page.getByLabel('Your name').fill('Test Visitor');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByLabel('What can we help with?').selectOption('Web development');
  await page.getByLabel('A little about your idea').fill('A website for an independent business.');
}
test('form submits to the backend and only confirms accepted enquiries',async({page})=>{
  await page.route('**/api/contact',async route=>{
    const body=route.request().postDataJSON();
    expect(body.email).toBe('test@example.com');
    expect(body.service).toBe('Web development');
    await route.fulfill({status:200,json:{message:'Your enquiry has been submitted.'}});
  });
  await page.goto('/');await fillForm(page);
  await page.getByRole('button',{name:'Send enquiry',exact:true}).click();
  await expect(page.getByRole('status')).toContainText('Thanks for reaching out.');
  await page.getByRole('button',{name:'Send another enquiry'}).click();
  await expect(page.getByLabel('Your name')).toBeEmpty();
});
test('failed delivery preserves the message and provides contact alternatives',async({page})=>{
  await page.route('**/api/contact',route=>route.fulfill({status:503,json:{error:'Our email form is awaiting activation.'}}));
  await page.goto('/');await fillForm(page);
  await page.getByRole('button',{name:'Send enquiry',exact:true}).click();
  await expect(page.getByRole('form',{name:'Project enquiry'}).getByRole('alert')).toContainText('awaiting activation');
  await expect(page.getByLabel('A little about your idea')).toHaveValue('A website for an independent business.');
  await expect(page.getByRole('status')).toHaveCount(0);
  await expect(page.getByRole('link',{name:'Continue on WhatsApp'})).toHaveAttribute('href',/wa\.me\/916309639767/);
});
test('search metadata, national service area, and crawl files exist',async({page,request})=>{
  await page.goto('/');
  await expect(page).toHaveTitle(/Studio in India/);
  const data=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent()||'{}');
  expect(data.areaServed.name).toBe('India');
  expect(data.hasOfferCatalog.itemListElement).toHaveLength(7);
  expect((await request.get('/robots.txt')).ok()).toBeTruthy();
  expect((await request.get('/sitemap.xml')).ok()).toBeTruthy();
  expect((await request.get('/opengraph-image')).ok()).toBeTruthy();
});
test('both themes fit phone, tablet, desktop, and ultrawide screens',async({page})=>{
  await page.goto('/');
  for(const theme of ['dark','light']){
    if(theme==='light')await page.getByRole('button',{name:'Switch to light theme'}).click();
    for(const width of [320,360,390,430,768,820,1024,1280,1440,1920,2560]){
      await page.setViewportSize({width,height:900});
      await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),{message:`Page overflow at ${width}px in ${theme}`}).toBe(true);
      const overflowing=await page.locator('h1,h2,h3,.form-grid').evaluateAll(els=>els.filter(el=>el.scrollWidth>el.clientWidth+2).map(el=>el.textContent));
      expect(overflowing,`Content overflow at ${width}px in ${theme}`).toEqual([]);
    }
  }
});
