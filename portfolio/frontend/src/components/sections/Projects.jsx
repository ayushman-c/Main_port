import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import Badge from '../ui/Badge'
import { featuredProjects } from '../../data/projects'

gsap.registerPlugin(ScrollTrigger)

// External link icon
function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

// GitHub icon
function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  // Hover tilt
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6
    card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(4px)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)'
      cardRef.current.style.transition = 'transform 0.4s ease'
    }
    setTimeout(() => {
      if (cardRef.current) cardRef.current.style.transition = ''
    }, 400)
  }

  const categoryColor = {
    'Blockchain':  'bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200/50 dark:border-violet-800/50',
    'AI/ML':       'bg-green-500/10  text-green-700  dark:text-green-300  border-green-200/50  dark:border-green-800/50',
    'Full Stack':  'bg-blue-500/10   text-blue-700   dark:text-blue-300   border-blue-200/50   dark:border-blue-800/50',
  }[project.category] ?? 'badge'

  const statusColor = {
    'In Progress': 'text-amber-600 dark:text-amber-400',
    'Completed':   'text-green-600 dark:text-green-400',
  }[project.status] ?? 'text-zinc-500'

  return (
    <article
      ref={cardRef}
      className="card group relative flex flex-col overflow-hidden"
      style={{ willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hero gradient bar */}
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`}
        aria-hidden="true"
      />

      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border ${categoryColor}`}>
                {project.category}
              </span>
              <span className={`text-[11px] font-mono ${statusColor} flex items-center gap-1`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {project.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-0.5">{project.tagline}</p>
          </div>
          <span className="text-xs font-mono text-zinc-400 flex-shrink-0">{project.year}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Features (top 3) */}
        <ul className="space-y-1">
          {project.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-500">
              <span className="mt-0.5 w-1 h-1 rounded-full bg-zinc-400 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Footer links */}
        <div className="flex items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label={`${project.title} GitHub repository`}
            >
              <GithubIcon /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLinkIcon /> Live Demo
            </a>
          )}
          <Link
            to={`/projects/${project.id}`}
            className="ml-auto flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            aria-label={`Case study for ${project.title}`}
          >
            Case Study →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-card', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section">
      <div className="container-wide">
        <SectionHeading
          label="What I've built"
          title="Featured Projects"
          subtitle="A selection of production-grade projects across full stack, blockchain, and AI/ML."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <div key={project.id} className="projects-card">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/ayushman-c"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-lg inline-flex"
          >
            View all on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}
