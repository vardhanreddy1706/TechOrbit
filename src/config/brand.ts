export const brand = {
  name: 'TechOrbit',
  description: 'TechOrbit is an independent creative technology studio serving businesses across India. Websites, app development, design, digital marketing, AI solutions, and ongoing support.',
  colors: { midnight: '#080A12', blue: '#1769FF', violet: '#8B5CF6', white: '#F5F7FF' },
  email: 'techorbitsupport26@gmail.com',
  emailUrl: 'mailto:techorbitsupport26@gmail.com',
  whatsapp: '+91 6309639767',
  whatsappUrl: 'https://wa.me/916309639767',
  instagram: 'https://www.instagram.com/tech.orbit26/',
  instagramHandle: '@tech.orbit26',
  serviceArea: 'India',
  timezone: 'Asia/Kolkata',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://techorbit26.site',
  logo: '/brand/primary-dark.png',
  lightLogo: '/brand/primary-light.png',
  monochromeLogo: '/brand/monochrome-black.png',
  favicon: '/brand/primary-dark.png',
  // Original square canvases are framed with CSS. Set false for a tight SVG/PNG.
  squareLogoCanvas: true,
  contact: {
    provider: 'formsubmit',
    // FormSubmit emails this inbox an activation link after the first submission.
    endpoint: 'https://formsubmit.co/ajax/techorbitsupport26@gmail.com',
  },
};
