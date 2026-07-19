import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { getProjectById } from '../data/projects'

// Back arrow
function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  )
}

// External link icon
function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

export default function ProjectDetail() {
  const { id }  = useParams()
  const project = getProjectById(id)
  const mainRef = useRef(null)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // GSAP entrance
  useEffect(() => {
    if (!mainRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.detail-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.1,
      })
    }, mainRef)
    return () => ctx.revert()
  }, [id])

  if (!project) return <Navigate to="/404" replace />

  const categoryColor = {
    'Blockchain': 'from-violet-500/20 to-purple-600/10',
    'AI/ML':      'from-green-500/20 to-emerald-600/10',
    'Full Stack': 'from-blue-500/20 to-cyan-600/10',
  }[project.category] ?? 'from-zinc-500/10 to-zinc-600/5'

  const statusColor = {
    'In Progress': 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
    'Completed':   'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
  }[project.status] ?? 'text-zinc-500 bg-zinc-50 dark:bg-zinc-900'

  return (
    <>
      <Navbar />
      <main ref={mainRef} className="min-h-screen pt-24 pb-20">
        <div className="container-wide">
          {/* Back */}
          <div className="detail-reveal mb-8">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <BackIcon />
              Back to Projects
            </Link>
          </div>

          {/* Hero */}
          <div className={`detail-reveal rounded-3xl bg-gradient-to-br ${categoryColor} p-8 md:p-12 mb-10 relative overflow-hidden`}>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="badge">{project.category}</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${statusColor}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {project.status}
                </span>
                <span className="text-xs font-mono text-zinc-400">{project.year}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-3 leading-none">
                {project.title}
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                {project.tagline}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <div className="detail-reveal">
                <h2 className="text-sm font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-4">
                  Overview
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
                  {project.longDescription}
                </p>
              </div>

              {/* Architecture */}
              <div className="detail-reveal">
                <h2 className="text-sm font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-4">
                  Architecture
                </h2>
                <div className="card p-6">
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                    {project.architecture}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="detail-reveal">
                <h2 className="text-sm font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-4">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs flex items-center justify-center flex-shrink-0 font-mono text-zinc-500">
                        {i + 1}
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Links */}
              <div className="detail-reveal card p-6 space-y-3">
                <h3 className="text-sm font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-4">Links</h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
                  >
                    <GithubIcon />
                    GitHub Repository
                    <ExternalIcon />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <ExternalIcon />
                    Live Demo
                  </a>
                )}
                {!project.github && !project.live && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-600">No public links yet.</p>
                )}
              </div>

              {/* Tech Stack */}
              <div className="detail-reveal card p-6">
                <h3 className="text-sm font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* More projects */}
              <div className="detail-reveal">
                <Link
                  to="/#projects"
                  className="btn btn-ghost w-full justify-center"
                >
                  ← All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
