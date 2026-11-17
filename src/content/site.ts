export const tools = {
  react: { name: 'React', icon: 'react' }, nextjs: { name: 'Next.js', icon: 'nextjs' },
  typescript: { name: 'TypeScript', icon: 'typescript' }, tailwindcss: { name: 'Tailwind CSS', icon: 'tailwindcss' },
  nodejs: { name: 'Node.js', icon: 'nodejs' }, mongodb: { name: 'MongoDB', icon: 'mongodb' },
  google: { name: 'Google / Gemini', icon: 'google' }, python: { name: 'Python', icon: 'python' },
  meta: { name: 'Meta', icon: 'meta' }, instagram: { name: 'Instagram', icon: 'instagram' },
  figma: { name: 'Figma', icon: 'figma' }, aftereffects: { name: 'After Effects', icon: 'aftereffects' },
  premierepro: { name: 'Premiere Pro', icon: 'premierepro' }, photoshop: { name: 'Photoshop', icon: 'photoshop' },
  docker: { name: 'Docker', icon: 'docker' }, vercel: { name: 'Vercel', icon: 'vercel' },
  git: { name: 'Git', icon: 'git' }, java: { name: 'Java', icon: 'java' },
  spring: { name: 'Spring', icon: 'spring' }, angular: { name: 'Angular', icon: 'angular' },
};
export type ToolId = keyof typeof tools;
export const services: { title: string; short: string; subtitle: string; text: string; items: string[]; tools: ToolId[]; color: string }[] = [
  { title: 'Web development', short: 'Web', subtitle: 'Your business. Beautifully online.', text: 'Fast, distinctive websites that make your business easy to understand and a pleasure to explore.', items: ['Business & portfolio websites', 'E-commerce websites', 'Campaign landing pages', 'Custom web applications', 'Responsive UI/UX development'], tools: ['react','nextjs','tailwindcss','typescript'], color: '#1769FF' },
  { title: 'App development', short: 'Apps', subtitle: 'From an idea to a product people use.', text: 'Interfaces that feel intuitive, with dependable engineering behind every interaction.', items: ['Custom application development', 'Frontend & backend engineering', 'API development', 'Database architecture', 'Authentication & security', 'Admin dashboards'], tools: ['react','nodejs','mongodb'], color: '#45c49c' },
  { title: 'AI solutions & automation', short: 'AI', subtitle: 'Less busywork. More possibility.', text: 'Practical AI integrations that help people work, create, and find information more effectively.', items: ['AI applications, chatbots & assistants', 'AI content generation', 'AI image & video workflows', 'Custom AI integrations', 'Intelligent business automation'], tools: ['google','python','nodejs'], color: '#a88bfa' },
  { title: 'Social media & marketing', short: 'Social', subtitle: 'Make your presence feel like you.', text: 'A clear, consistent brand presence that connects your everyday content with your bigger goals.', items: ['Instagram account management', 'Social content & promotional reels', 'Creative advertisements', 'Meta Ads campaigns', 'Brand identity & digital presence', 'Lead generation strategies'], tools: ['meta','instagram','photoshop'], color: '#f0789c' },
  { title: 'Content & motion design', short: 'Motion', subtitle: 'Stories with a little more movement.', text: 'Thoughtfully edited films, graphics, and campaigns that bring your brand into focus.', items: ['Promotional & product showcase videos', 'Motion graphics', 'Video editing', 'AI-assisted video production', 'Creative campaigns'], tools: ['aftereffects','premierepro','photoshop'], color: '#c09af5' },
  { title: 'Cloud, deployment & care', short: 'Cloud', subtitle: 'A smooth launch. A supported future.', text: 'Get your product into the world, then keep it secure, dependable, and performing well.', items: ['Application & backend deployment', 'Cloud hosting', 'Domain & hosting configuration', 'CI/CD setup', 'Website maintenance & bug fixes', 'Performance optimization'], tools: ['vercel','docker','git'], color: '#52b7df' },
  { title: 'Tech education & consulting', short: 'Learn', subtitle: 'A clearer path to your next step.', text: 'Practical guidance for founders, teams, and developers turning technical questions into forward progress.', items: ['Programming training', 'Full-stack development guidance', 'Java & Spring Boot', 'React & Angular', 'Cloud & DevOps fundamentals', 'Project-based learning & consulting'], tools: ['java','spring','angular'], color: '#eda36d' },
];
export type Project = {
  id:string; name:string; category:string; description:string; tags:string[];
  accent:string; image:string; imageAlt:string; width:number; height:number;
  url:string|null; caption:string;
  video?:string; mobileVideo?:string; durationSeconds?:number; videoDescription?:string;
};
export const projects:Project[] = [
  { id: 'rapidreel', name: 'RapidReel', category: 'CREATOR EXPERIENCE', description: 'A vibrant home for reel booking and creator portfolios. A bold visual language built around moments worth replaying.', tags: ['Web experience', 'Booking journeys', 'Creator platform'], accent: '#a478fa', image: '/projects/rapidreel.png', imageAlt: 'RapidReel homepage with Live it. Reel it. headline, reel previews and booking navigation', width: 1897, height: 909, url: null as string | null, caption: 'Made for the moments that move you.' },
  { id: 'cropconnect', name: 'Crop Connect', category: 'AGRICULTURE × TECHNOLOGY', description: 'An agriculture-focused digital platform, with a Telugu-language experience that makes technology feel closer to the people it serves.', tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Gemini AI'], accent: '#55c493', image: '/projects/crop-connect.png', imageAlt: 'Crop Connect Telugu-language homepage showing farmers, agricultural imagery and registration actions', width: 1904, height: 924, url: 'https://agri.cropconnects.in', caption: 'Rooted in agriculture. Connected by technology.' },
  { id: 'matrixmissions', name: 'Matrix Missions', category: 'FINTECH · IMMERSIVE WEB EXPERIENCE', description: 'A cinematic website for a forex and cryptocurrency trading business. Monochrome 3D landscapes, motion-led storytelling, and focused service navigation bring the brand into view.', tags: ['Website experience', '3D & motion', 'Forex & crypto'], accent: '#aebce8', image: '/projects/matrix-missions-poster.jpg', imageAlt: 'Matrix Missions homepage with a monochrome 3D landscape, floating navigation, and market-focused messaging', width: 1600, height: 812, url: 'https://matrixmissions.in', caption: 'A different perspective on financial technology.', video: '/projects/matrix-missions-highlight.mp4', mobileVideo: '/projects/matrix-missions-highlight-mobile.mp4', durationSeconds: 10, videoDescription: 'Silent ten-second screen recording of the Matrix Missions website. The camera moves across a monochrome 3D landscape, past the Matrix Missions wordmark and floating navigation, into the homepage and service storytelling.' },
];
export const processSteps = [
  ['Discover', 'First, we listen.', 'Your business, your audience, and the problem worth solving.'],
  ['Plan', 'A clear direction.', 'We agree on scope, priorities, technology, and the steps ahead.'],
  ['Design', 'See your idea take shape.', 'Explore the visual direction and refine the experience together.'],
  ['Build', 'Craft in every detail.', 'Clean engineering, considered interactions, and regular progress reviews.'],
  ['Launch', 'Ready for the real world.', 'Test across devices, refine the details, and deploy with confidence.'],
  ['Grow', 'Here for what’s next.', 'Maintenance, improvements, and support as your business evolves.'],
];
export const faqs = [
  ['Do you work with businesses across India?', 'Yes. We collaborate remotely with businesses across India, using calls, shared previews, and clear project updates. You can start with a WhatsApp conversation or a project enquiry.'],
  ['Can you help if I only have an idea?', 'Absolutely. We start by understanding what you want to achieve, then help define the scope, design direction, and technical approach before development.'],
  ['How much does a project cost?', 'The cost depends on the scope, features, content, and timeline. Tell us what you have in mind and your budget range, and we’ll discuss a clear proposal before work begins.'],
  ['Can you improve an existing website or application?', 'Yes. We can review your existing experience and discuss focused improvements to design, usability, performance, or functionality.'],
  ['What happens after launch?', 'We offer deployment support, maintenance, bug fixes, and performance improvements. We agree on the support scope with you as part of the project.'],
];
