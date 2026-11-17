# TechOrbit

An independent creative studio website built with Next.js App Router, React, TypeScript, Three.js / React Three Fiber, and Lucide. Includes persistent dark/light themes, original TechOrbit logos, actual project screenshots, a responsive orbital sculpture, national service messaging, locally stored technology logos, service enquiries, project previews, FAQs, and direct email form delivery through FormSubmit.

## Run locally

Open `C:\Users\ChandraVadhanReddySu\techorbit` in VS Code. With Node.js 22 or newer available, open a terminal:

```sh
npm install
npm run dev
```

Visit http://127.0.0.1:3000 and keep that terminal running. If another app uses port 3000, Next.js prints the alternative URL. `npm run build` verifies the production version and `npm start` serves it. This project includes a user-generated `package-lock.json`; npm is the current local workflow.

## Activate real form delivery — one step in your inbox

The form submits to the Next.js backend at `/api/contact`, which validates the enquiry and forwards it to **FormSubmit.co** for delivery to **techorbitsupport26@gmail.com**. It no longer opens a mail draft. No Gmail password or paid email API is required.

1. Open the running site and send a short enquiry using an email address you control.
2. Open **techorbitsupport26@gmail.com**, including Spam, and find the FormSubmit activation email. Click **Activate Form**. This is the provider's required verification that you own the inbox. Your incoming site URL may need its own activation when you move from localhost to the production domain.
3. Send another enquiry and confirm it arrives in that inbox. Set the email subject filter to “TechOrbit project enquiry” if useful. Visitor email is used as Reply-To, so replying goes to the visitor.

Until activation, the site shows an honest error with WhatsApp and direct-email alternatives. It preserves entered text on errors and only displays the success state when the provider explicitly accepts the submission. Acceptance is not a guarantee of inbox placement. Check Spam during initial setup.

The server includes field limits, server-side validation, a honeypot, same-origin checks, and a small per-instance spam guard. This guard resets across restarts and is not a shared production rate limiter; add platform-level protection if traffic or abuse warrants it. Provider timeouts and failures return usable fallback actions without claiming delivery. No personal enquiry contents are logged or stored by the application. FormSubmit handles the submitted details according to its own service policy.

Provider references: https://formsubmit.co/ajax-documentation and https://formsubmit.co/help. Browser/API verification uses simulated mail responses; it does not send actual emails or certify that your inbox has been activated.

## Folder structure

```text
src/app/               Page, theme styles, metadata, robots, sitemap, share image
src/app/api/contact/   Validated email-delivery endpoint
src/components/        Logo, form, orbit, India network, motion study, technology logos
src/content/site.ts    Services, technologies, real projects, process, FAQs
src/config/brand.ts    Official contact details, original logos, colors, service area
src/lib/contact.ts     Shared validation and strict provider-response interpretation
public/brand/          Original, unmodified logo files
public/projects/       User-supplied RapidReel and Crop Connect screenshots
public/tools/          Local SVG technology/platform logos
public/licenses/       Asset provenance and Devicon license
tests/                 Browser and contact API checks
```

The square original logo canvases are framed using CSS. The light logo uses multiply blending to make its white background match the navigation surface. To substitute a tightly framed SVG or transparent PNG later, update the paths and set `squareLogoCanvas: false` in the brand config. Originals are never altered. Supply an original icon-only logo for a better small-size favicon; the full supplied dark logo remains the temporary favicon.

The technology logos identify tools relevant to each service, not partners or endorsements. The India network illustrates remote collaboration, not branch offices or past customers. The motion study demonstrates a visual direction; it does not claim to be a client deliverable. No fabricated testimonials, metrics, client outcomes, or locations are included. AI remains a service; the fictional AI workflow demo panels have been removed.

## Add or change content

- Edit brand/contact information in `src/config/brand.ts`.
- Edit service scope and tool associations in `src/content/site.ts`.
- Replace project screenshots in `public/projects/` and update their dimensions/alt text in the content file. The current screenshots are used intact, without an illustrative replacement overlay.
- Add RapidReel's public URL when available. Until then, visitors can view its full screenshot or ask about a similar project. Crop Connect uses its supplied live URL; external availability is outside this application's control.
- Theme colors and spacing are in `src/app/globals.css`. Pause motion is available in the hero and footer and system reduced-motion preferences are respected.

## Vercel and SEO

The production domain is **https://techorbit26.site**. Import this folder into Vercel as **Next.js**. `vercel.json` selects `npm ci` and `npm run build` for reproducible installation and deployment. Set **NEXT_PUBLIC_SITE_URL=https://techorbit26.site** in Vercel's Production environment before deploying. The centralized brand settings use the purchased domain as a fallback. Canonical metadata, Organization/Service structured data, social cards, `robots.txt`, and `sitemap.xml` use it automatically. Vercel preview deployments are marked noindex. Confirm form activation again on the final domain. See **DEPLOYMENT.md** for the complete GitHub, Vercel, domain/DNS, and enquiry activation steps.

Next.js optimizes the project images. The WebGL scene is loaded only near the viewport and pauses offscreen/background; a static orbital fallback handles unsupported devices. Controls, native dialogs, keyboard tabs, accessible accordions, form labels, and mobile navigation are designed to work at phone, tablet, laptop, desktop, and ultrawide sizes. Fonts use Google Fonts with system fallbacks; self-host them if required for your deployment.

## Checks

```sh
npm run typecheck
npm run build
npx playwright test
```

Run the local server before browser checks. To use installed Microsoft Edge in PowerShell:

```powershell
$env:PLAYWRIGHT_CHANNEL='msedge'
npx playwright test
```

For a different local port set `TEST_BASE_URL`, for example `http://127.0.0.1:3001`. Tests cover theme persistence, actual screenshot previews, service-to-form selection, keyboard process controls, FAQs, form success/failure, API validation and provider result interpretation, SEO routes, and both themes from 320px to 2560px. Email responses in tests are simulated; complete the activation and a real inbox test before relying on the form in production.

## Matrix Missions project film

The third featured project is **Matrix Missions**, confirmed at https://matrixmissions.in. Its card uses a real 10-second excerpt from your supplied recording: **16.50–26.50 seconds**. Desktop and mobile H.264 MP4 files, plus a poster taken from the same footage, live in `public/projects/`. The portfolio describes the visible forex/crypto website and cinematic interface; no operational exchange, financial results, or technology stack is invented.

Playback is user-initiated and silent, with native video controls after Play. The film loads only when requested, pauses offscreen or when the tab is hidden, and supports an enlarged dialog. A descriptive text alternative is provided for the silent visual demonstration. The original 35-second recording is not part of the deployed project. Edit provenance is recorded in `public/projects/matrix-missions-media.txt`.
