/**
 * Ayushman Chakraborty — Skills & Tech Stack
 */
export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '⬡',
    skills: [
      { name: 'React',         level: 90 },
      { name: 'JavaScript',    level: 88 },
      { name: 'Tailwind CSS',  level: 85 },
      { name: 'GSAP',          level: 75 },
      { name: 'Three.js',      level: 65 },
      { name: 'HTML / CSS',    level: 92 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⬡',
    skills: [
      { name: 'Node.js',       level: 85 },
      { name: 'Express',       level: 83 },
      { name: 'REST APIs',     level: 88 },
      { name: 'Django',        level: 72 },
      { name: 'JWT / Auth',    level: 80 },
      { name: 'WebSockets',    level: 75 },
    ],
  },
  {
    id: 'blockchain',
    label: 'Blockchain',
    icon: '⬡',
    skills: [
      { name: 'Stellar',       level: 82 },
      { name: 'Soroban',       level: 75 },
      { name: 'Smart Contracts', level: 70 },
      { name: 'Rust (Basics)', level: 55 },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    icon: '⬡',
    skills: [
      { name: 'Python',        level: 85 },
      { name: 'PyTorch',       level: 72 },
      { name: 'scikit-learn',  level: 75 },
      { name: 'TinyML',        level: 65 },
      { name: 'LangChain',     level: 70 },
      { name: 'FAISS',         level: 68 },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: '⬡',
    skills: [
      { name: 'MongoDB',       level: 82 },
      { name: 'PostgreSQL',    level: 72 },
      { name: 'Redis',         level: 68 },
      { name: 'FAISS',         level: 65 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: '⬡',
    skills: [
      { name: 'Git / GitHub',  level: 90 },
      { name: 'DSA',           level: 78 },
      { name: 'Linux',         level: 70 },
      { name: 'Docker',        level: 60 },
      { name: 'VS Code',       level: 95 },
    ],
  },
]

// Flat tag cloud — all skill names for the visual tag display
export const allSkillTags = [
  'React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Python',
  'Django', 'Stellar', 'Soroban', 'PyTorch', 'scikit-learn', 'Git',
  'GitHub', 'REST APIs', 'JWT', 'DSA', 'Redis', 'PostgreSQL',
  'TinyML', 'LangChain', 'FAISS', 'Tailwind CSS', 'GSAP', 'Three.js',
  'Rust', 'WebSockets', 'Docker', 'IPFS',
]

// Coding profiles
export const codingProfiles = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    url: 'https://leetcode.com/ayushman-dev',
    icon: 'leetcode',
    color: '#FFA116',
    stats: { solved: 250, rank: 'Top 20%' },
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/ayushman-c',
    icon: 'github',
    color: '#ffffff',
    stats: { repos: null, followers: null }, // fetched dynamically
  },
]

// Certifications
export const certifications = [
  {
    id: 'cert-1',
    title: 'Stellar Developer Bootcamp',
    issuer: 'Stellar Development Foundation',
    year: '2024',
    url: '#',
    badge: '⭐',
  },
  {
    id: 'cert-2',
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    year: '2024',
    url: '#',
    badge: '🤖',
  },
  {
    id: 'cert-3',
    title: 'MERN Stack Development',
    issuer: 'Udemy',
    year: '2023',
    url: '#',
    badge: '⚛️',
  },
]
