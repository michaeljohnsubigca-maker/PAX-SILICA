import { ExplainerContent } from '../types/domain';

export const EXPLAINER_CONTENT: ExplainerContent = {
  declarationDate: 'April 16, 2026',
  signatoryOrder: '13th Multilateral Signatory',
  partnerNations: ['United States', 'Japan', 'South Korea', 'Taiwan (Allied Technical Cooperatives)', 'European Union'],
  heroSummary: 'Pax Silica is an international technological and economic security compact designed to build trusted, resilient microelectronics supply chains among allied democratic economies. For the Philippines, this initiative anchors the Luzon Economic Corridor as the premiere manufacturing and research hub in Southeast Asia.',
  pillars: [
    {
      title: 'What is Pax Silica?',
      question: 'Why did 13 nations sign this declaration?',
      answer: 'Global microchips power everything from everyday smartphones to clean energy grids and medical robotics. Pax Silica establishes a verified allied production circle to prevent supply bottlenecks and protect democratic economies from semiconductor shortages or geopolitical coercion.',
      keyStat: '13',
      statLabel: 'Signatory Nations',
    },
    {
      title: 'Why the Philippines?',
      question: 'What makes Luzon the strategic choice?',
      answer: 'The Philippines has spent four decades assembling and testing over 10% of the world semiconductor market. With a young English-proficient engineering workforce, deep mineral wealth in nickel and copper, and strategic deepwater ports at Subic and Batangas, the Luzon Corridor provides an unbeatable combination of talent and geography.',
      keyStat: '40+ Years',
      statLabel: 'Semiconductor Assembly Heritage',
    },
    {
      title: 'Sovereignty & Prosperity',
      question: 'How do Filipino workers and communities benefit?',
      answer: 'Pax Silica is not an extractive concession. Constitutional safeguards require all foreign locators to follow Philippine civil and labor law, pay national taxes, and hire local engineers. Domestic refining mandates ensure Philippine critical minerals create high-paying domestic tech jobs rather than leaving as cheap raw ore.',
      keyStat: '25,000+',
      statLabel: 'High-Tech Engineering Careers Target',
    },
  ],
};
