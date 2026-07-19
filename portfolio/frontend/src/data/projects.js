/**
 * Ayushman Chakraborty — Project Data
 * Each project supports: hero image, description, architecture, tech, features, links
 */
export const projects = [
  {
    id: 'freelancex',
    slug: 'freelancex',
    title: 'FreelanceX',
    tagline: 'Decentralized Freelancer Marketplace',
    description:
      'Production-grade decentralized freelancer marketplace powered by Stellar Soroban smart contracts. Enables trustless job posting, bidding, escrow, and payment — without a central authority.',
    longDescription:
      'FreelanceX redefines the gig economy by eliminating platform intermediaries through smart contracts. The platform manages the entire lifecycle — from job discovery and proposal submission to milestone-based escrow and final settlement — entirely on-chain via Stellar Soroban. A React frontend communicates with the Stellar Horizon API while a lightweight Node.js layer handles off-chain metadata and indexing.',
    architecture:
      'The system is split into three layers: (1) Soroban smart contracts handle escrow, dispute resolution, and payment logic; (2) a Node.js/Express indexer syncs contract events to MongoDB for fast querying; (3) a React frontend uses the Stellar Wallet SDK for user authentication and transaction signing. IPFS stores proposal documents and portfolios.',
    category: 'Blockchain',
    featured: true,
    color: '#7c3aed',
    gradient: 'from-violet-600 to-purple-900',
    tech: ['Stellar', 'Soroban', 'Rust', 'React', 'Node.js', 'MongoDB', 'IPFS'],
    features: [
      'Soroban-based escrow with milestone unlocks',
      'Trustless dispute resolution via on-chain voting',
      'Stellar Wallet SDK authentication',
      'Off-chain metadata indexing for instant search',
      'IPFS storage for proposal documents',
      'Real-time contract event streaming',
    ],
    github: 'https://github.com/ayushman-c/freelancex',
    live: null,
    caseStudy: null,
    year: '2024',
    status: 'In Progress',
  },
  {
    id: 'kavach',
    slug: 'kavach',
    title: 'KAVACH',
    tagline: 'AI-Powered Mining Safety Platform',
    description:
      'Intelligent smart mining safety platform combining IoT sensors, TinyML edge inference, and real-time monitoring dashboards to prevent accidents before they happen.',
    longDescription:
      'KAVACH (कवच, meaning "shield") tackles one of the most lethal industries through AI. Edge devices with TinyML models run gas, temperature, and motion anomaly detection directly on microcontrollers — no cloud dependency for safety-critical decisions. Alerts escalate through a real-time dashboard powered by WebSockets, while a Django backend aggregates telemetry, manages worker profiles, and maintains compliance logs.',
    architecture:
      'Three-tier architecture: (1) Edge layer — ESP32/Arduino nodes running TinyML PyTorch models compiled via TensorFlow Lite, detecting gas leaks, temperature spikes, and fall events locally; (2) Backend — Django + Django Channels for real-time WebSocket alerts, PostgreSQL for telemetry, Redis for pub/sub; (3) Frontend — React dashboard with live sensor maps, alert heatmaps, and incident timelines.',
    category: 'AI/ML',
    featured: true,
    color: '#d97706',
    gradient: 'from-amber-500 to-orange-800',
    tech: ['Python', 'PyTorch', 'TinyML', 'Django', 'React', 'WebSocket', 'IoT', 'Redis'],
    features: [
      'TinyML models running on ESP32 microcontrollers',
      'Real-time gas & temperature anomaly detection',
      'Sub-100ms on-edge inference latency',
      'Live worker location tracking with alert zones',
      'WebSocket-powered incident dashboard',
      'Automated compliance report generation',
    ],
    github: 'https://github.com/ayushman-c/kavach',
    live: null,
    caseStudy: null,
    year: '2024',
    status: 'Completed',
  },
  {
    id: 'coinpay',
    slug: 'coinpay',
    title: 'CoinPay',
    tagline: 'Blockchain Payment Platform on Stellar',
    description:
      'Fast, low-fee cross-border payment platform built on the Stellar network. Supports XLM and asset-anchored stablecoin transfers with wallet management and transaction history.',
    longDescription:
      'CoinPay leverages Stellar\'s high-throughput consensus protocol (5-second finality, sub-cent fees) to make cross-border payments accessible. Users connect Stellar wallets, manage multiple asset balances, and execute transfers that settle on-chain. A React frontend integrates the Stellar JS SDK for transaction construction while a Node.js backend handles federation lookups, transaction memos, and notification delivery.',
    architecture:
      'Stellar-native architecture: React frontend uses @stellar/stellar-sdk to build, sign, and submit transactions directly to Horizon. Node.js backend handles Stellar federation protocol for human-readable addresses, webhook notifications via SendGrid, and analytics aggregation. PostgreSQL stores user preferences and transaction metadata.',
    category: 'Blockchain',
    featured: true,
    color: '#0891b2',
    gradient: 'from-cyan-500 to-blue-800',
    tech: ['Stellar', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Stellar SDK'],
    features: [
      '5-second transaction finality on Stellar network',
      'Multi-asset wallet with XLM and stablecoins',
      'Stellar federation address resolution',
      'Real-time transaction status tracking',
      'QR code payment requests',
      'Transaction history with export',
    ],
    github: 'https://github.com/ayushman-c/coinpay',
    live: null,
    caseStudy: null,
    year: '2024',
    status: 'Completed',
  },
  {
    id: 'local-multimodal-rag',
    slug: 'local-multimodal-rag',
    title: 'Local Multimodal RAG',
    tagline: 'Lightweight On-Device RAG System',
    description:
      'Lightweight multimodal Retrieval-Augmented Generation system designed to run entirely locally. Query PDFs, images, and text with natural language — zero cloud dependency.',
    longDescription:
      'This RAG pipeline combines a local LLM (via Ollama) with a FAISS vector store for semantic search across text documents and images. The multimodal ingestion pipeline uses CLIP for image embeddings and sentence-transformers for text, enabling unified similarity search. A Gradio interface provides an accessible local UI. The entire stack runs offline on consumer hardware.',
    architecture:
      'Ingestion pipeline: documents split by LangChain text splitters → embedded with sentence-transformers (text) or CLIP (images) → stored in FAISS. Query pipeline: user query → embedded → top-k retrieval → prompt construction → Ollama LLM inference → streamed response. Gradio serves the UI locally on port 7860.',
    category: 'AI/ML',
    featured: true,
    color: '#059669',
    gradient: 'from-emerald-500 to-green-900',
    tech: ['Python', 'PyTorch', 'LangChain', 'FAISS', 'CLIP', 'Ollama', 'Gradio'],
    features: [
      '100% local — no API keys or cloud required',
      'Multimodal: text documents + image understanding',
      'CLIP-based image embedding for semantic image search',
      'Streaming responses via Ollama',
      'FAISS vector store with persistence',
      'Gradio web UI for document upload and querying',
    ],
    github: 'https://github.com/ayushman-c/local-multimodal-rag',
    live: null,
    caseStudy: null,
    year: '2024',
    status: 'Completed',
  },
  {
    id: 'bytebuddy',
    slug: 'bytebuddy',
    title: 'ByteBuddy',
    tagline: 'MERN-Based Micro-Gig Platform',
    description:
      'Full-stack MERN gig marketplace where users post and complete paid micro-tasks. Features real-time notifications, secure payments, and a skill-based matching algorithm.',
    longDescription:
      'ByteBuddy democratizes micro-work by connecting task posters with skilled doers in real time. The platform supports task categories from code reviews to design feedback. JWT authentication secures all routes; Socket.io powers live notifications and chat. A custom matching algorithm ranks available workers by relevant skills, completion rate, and response time.',
    architecture:
      'Classic MERN with real-time layer: MongoDB + Mongoose for data; Express REST API with JWT middleware; React frontend with React Query for server state; Socket.io for live updates and in-task chat. Payment processing via Razorpay (sandboxed). Redis caches leaderboard and hot task feeds.',
    category: 'Full Stack',
    featured: true,
    color: '#db2777',
    gradient: 'from-pink-500 to-rose-900',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'Redis', 'JWT'],
    features: [
      'Real-time task bidding and chat via Socket.io',
      'JWT authentication with refresh token rotation',
      'Skill-based worker ranking algorithm',
      'Escrow payment flow with Razorpay',
      'Completion rate and review system',
      'Redis-cached leaderboard and feed',
    ],
    github: 'https://github.com/ayushman-c/bytebuddy',
    live: null,
    caseStudy: null,
    year: '2023',
    status: 'Completed',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectById(id) {
  return projects.find((p) => p.id === id) ?? null
}
