# Launch TechOrbit at techorbit26.site

The source project is `C:\Users\ChandraVadhanReddySu\techorbit`. Its primary production URL is now **https://techorbit26.site**. The code is prepared for deployment; changing the configuration does not publish it or configure the domain by itself.

## 1. Put the project on GitHub

Open the project folder in VS Code. Use **Source Control → Initialize Repository**, commit the project, then choose **Publish to GitHub**. A private repository is fine. Include `src`, `public`, `package.json`, `package-lock.json`, `vercel.json`, and the other project/configuration files. The supplied `.gitignore` excludes installed dependencies, build output, local environment files, and test results.

Both versions of the Matrix Missions film are small enough to live in `public/projects` with the rest of the site assets. Keep the original full recording outside the repository; it is not needed for deployment.

## 2. Import into Vercel

Sign in at https://vercel.com and choose **Add New → Project**. Import the GitHub repository. Use the folder containing `package.json` as the project root.

Use the **Next.js** framework preset. `vercel.json` already sets installation to `npm ci` and building to `npm run build`. Leave the output directory at the Next.js default. The existing npm lockfile supplies the dependencies even though an older pnpm lockfile is also present.

This application needs its Next.js backend for `/api/contact`; deploy the project as a Next.js application rather than a static-only export. [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [project configuration](https://vercel.com/docs/project-configuration).

For this commercial agency website, choose a Vercel plan that permits business use. Vercel reserves Hobby for personal, non-commercial projects; Pro supports commercial use. No plan purchase has been made for you. [Vercel fair-use guidance](https://vercel.com/docs/limits/fair-use-guidelines).

## 3. Set the production website URL

In the Vercel project's environment variables, add:

```text
NEXT_PUBLIC_SITE_URL=https://techorbit26.site
```

Apply it to **Production**, then deploy. If you add or change it after deployment, redeploy so the canonical links, structured data, social metadata, and sitemap use the new value. The brand configuration also uses this domain as its default. [Vercel environment variables](https://vercel.com/docs/environment-variables).

## 4. Connect the purchased domain

In **Project → Settings → Domains**, add `techorbit26.site` and `www.techorbit26.site`. Make the bare domain the primary address and redirect `www` to it.

At the company where you bought the domain, open its DNS settings and enter the records shown by this specific Vercel project:

| Type | Name/host | Value |
| --- | --- | --- |
| A | `@` | The exact IP address shown by Vercel for `techorbit26.site` |
| CNAME | `www` | The exact target shown by Vercel for `www.techorbit26.site` |

Resolve any conflicting website/parking records for those hosts. Wait until Vercel shows valid configuration and the HTTPS certificate is ready. DNS targets can differ by project, so use the dashboard values. [Vercel domain instructions](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

## 5. Confirm enquiries arrive in Gmail

From the live domain, submit an enquiry using an email address you control. Open **techorbitsupport26@gmail.com**, including Spam, and click the FormSubmit activation link if prompted. Resubmit and check that the enquiry arrives and Reply goes to the visitor's address. Local activation may not cover the new production URL. [FormSubmit help](https://formsubmit.co/help).

## 6. Review the live experience

Open the homepage on a phone and desktop. Check the light/dark switch, all three featured projects, Matrix Missions playback and enlargement, service selection, WhatsApp/email links, and form submission. The video is silent, click-to-play, and should pause when scrolled away.

These URLs should be available after the deployment and domain connection finish:

- https://techorbit26.site
- https://techorbit26.site/robots.txt
- https://techorbit26.site/sitemap.xml
- https://techorbit26.site/opengraph-image

You can then verify ownership in Google Search Console and submit the sitemap. Future commits to the connected production branch will trigger Vercel deployments. [Vercel deployments](https://vercel.com/docs/deployments).

## Matrix Missions media notes

- Project website confirmed by you: https://matrixmissions.in.
- The recording is of this same website. Its public page identifies forex and cryptocurrency trading services. The portfolio describes the visible website experience without claiming an independently verified exchange engine, custody system, licensing, trading results, or project technology stack.
- Selected source interval: **16.50–26.50 seconds**, exactly **10.00 seconds** at 30 fps (300 frames).
- Desktop: H.264 MP4, 1600×812, approximately 3.1 MB.
- Mobile: H.264 MP4, 960×488, approximately 1.3 MB.
- Original recording audio is omitted for a silent, user-controlled website showcase. Both clips have fast-start metadata; neither autoplays or preloads the video on the initial page load.
