import type { Bio } from '../types/content'
export const bio = {
  oneLine: 'I design clear, coherent products from complex ideas.', short: 'Product and founding designer focused on product architecture, design systems, and end-to-end experiences.', long: 'I’m a product designer who enjoys making sense of complicated products—especially when they have many moving parts, unclear flows, or need a stronger foundation before they can grow. My background in mechanical engineering shapes a structured, systems-minded approach grounded in real constraints.',
  narrative: ['I originally studied mechanical engineering. I was drawn to the logic of it: understanding how different parts affect one another, working through constraints, and finding practical ways to solve difficult problems.', 'Over time, I became more interested in the experiences around the systems than the machines themselves. That curiosity led me to product design.', 'The medium changed, but parts of my approach stayed with me. I still like to understand how things fit together before deciding what they should look like. I ask a lot of questions, map the underlying structure, and work from the whole experience down to the smallest interaction.'],
  portrait: { src: '/images/portrait.jpg', alt: 'Portrait of the designer', width: 1200, height: 1500, placeholder: '#bcb6a8' },
} satisfies Bio
export const aboutContent = { kicker: 'ABOUT ME', headline: ['Curious by nature.'], emphasis: 'Structured by training.', principlesKicker: 'HOW I WORK', principlesHeadline: ['Principles, not', 'a fixed process.'], principlesSupport: 'Every project is different. These are the ideas I return to.' }

export const resumeContent = {
  label: 'RÉSUMÉ / 2026', headline: 'Product designer building clear products and strong foundations.',
  summary: 'Product and founding designer focused on product architecture, design systems, and end-to-end product flows. I bring a structured, systems-minded approach shaped by a background in mechanical engineering.', downloadLabel: 'Download as PDF',
  experience: [
    { company: 'Company / Product', role: 'Founding Product Designer', period: '2023 — Present', location: 'Remote', summary: 'Led product design from early definition through launch, shaping the core product model, critical flows, and the design system supporting continued growth.', highlights: ['Defined product architecture and end-to-end customer journeys.', 'Established reusable foundations, components, and contribution practices.', 'Partnered with founders and engineering to turn evolving strategy into shipped product.'] },
    { company: 'Previous Company', role: 'Product Designer', period: '2021 — 2023', location: 'Remote', summary: 'Designed complex workflows and helped improve consistency across a growing product.', highlights: ['Simplified high-friction product flows through research and iterative prototyping.', 'Created shared interaction patterns used across multiple product areas.'] },
  ],
  education: [{ school: 'University Name', qualification: 'B.Eng. Mechanical Engineering', period: 'Year' }],
  capabilities: ['Product architecture', 'Design systems', 'Zero-to-one product design', 'Interaction design', 'Prototyping', 'Product strategy', 'Research synthesis', 'Cross-functional facilitation'],
  tools: ['Figma', 'FigJam', 'Prototyping tools', 'Documentation tools'],
  note: 'Replace placeholder company and education details in src/content/bio.ts before publishing.',
}
