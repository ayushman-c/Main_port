import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import MagneticButton from '../ui/MagneticButton'
import ErrorBoundary from '../ui/ErrorBoundary'

const HeroScene = lazy(() => import('../three/HeroScene'))

const TITLES = [
  'Full Stack Developer',
  'Software Engineer',
  'Blockchain Developer',
  'AI / ML Engineer',
  'MERN Stack Developer',
]

// Mouse spotlight hook
function useMouseSpotlight(containerRef) {
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const move = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width)  * 100
      const y = ((e.clientY - rect.top)  / rect.height) * 100
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    }

    el.addEventListener('mousemove', move, { passive: true })
    return () => el.removeEventListener('mousemove', move)
  }, [containerRef])
}

// Typewriter rotating title
function RotatingTitle({ titles }) {
  const ref      = useRef(null)
  const indexRef = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.textContent = titles[0]

    const cycle = () => {
      gsap.to(el, {
        y: -16,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          indexRef.current = (indexRef.current + 1) % titles.length
          el.textContent = titles[indexRef.current]
          gsap.fromTo(el,
            { y: 16, opacity: 0 },
            { y: 0,  opacity: 1, duration: 0.35, ease: 'power2.out' }
          )
        },
      })
    }

    const id = setInterval(cycle, 2800)
    return () => clearInterval(id)
  }, [titles])

  return (
    <span
      ref={ref}
      className="inline-block overflow-hidden"
      aria-live="polite"
      style={{ minWidth: '22ch' }}
    />
  )
}

// Arrow down icon
function ArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <polyline points="19 12 12 19 5 12"/>
    </svg>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const tlRef        = useRef(null)

  useMouseSpotlight(containerRef)

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ delay: 0.15 })

      tlRef.current
        .from('.hero-label',    { y: 12, opacity: 0, duration: 0.5, ease: 'power3.out' })
        .from('.hero-name',     { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .from('.hero-title',    { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.45')
        .from('.hero-tagline',  { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.45')
        .from('.hero-cta',      { y: 16, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.35')
        .from('.hero-social',   { opacity: 0, duration: 0.4 }, '-=0.2')
        .from('.hero-scroll',   { opacity: 0, y: 8, duration: 0.4 }, '-=0.1')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at var(--mx, 50%) var(--my, 50%), rgba(120,80,255,0.06) 0%, transparent 60%)',
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-100 pointer-events-none"
        aria-hidden="true"
      />

      {/* 3D Scene — right side, behind content */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[60vh] opacity-60 dark:opacity-80 pointer-events-none"
        aria-hidden="true"
      >
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide flex flex-col items-start text-left max-w-4xl pt-32 pb-20">
        {/* Label */}
        <p className="hero-label section-label mb-5">
          B.Tech Student · Narula Institute of Technology
        </p>

        {/* Name */}
        <h1 className="hero-name text-6xl md:text-8xl font-black tracking-tight leading-none mb-4">
          <span className="text-gradient-dark dark:text-gradient-white">
            Ayushman
          </span>
          <br />
          <span className="text-zinc-900 dark:text-zinc-100">Chakraborty</span>
        </h1>

        {/* Rotating title */}
        <div className="hero-title text-xl md:text-2xl font-mono text-zinc-500 dark:text-zinc-400 mb-6 h-8 flex items-center">
          <RotatingTitle titles={TITLES} />
        </div>

        {/* Tagline */}
        <p className="hero-tagline max-w-lg text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
          Building scalable web applications, intelligent AI solutions,
          and decentralized blockchain systems.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <MagneticButton className="hero-cta">
            <a href="#projects" className="btn btn-primary btn-lg">
              View Projects
            </a>
          </MagneticButton>
          <MagneticButton className="hero-cta">
            <Link to="/resume" className="btn btn-ghost btn-lg">
              Download Resume
            </Link>
          </MagneticButton>
          <MagneticButton className="hero-cta">
            <a href="#contact" className="btn btn-outline btn-lg">
              Contact Me
            </a>
          </MagneticButton>
        </div>

        {/* Social quick links */}
        <div className="hero-social flex items-center gap-5">
          {[
            { label: 'GitHub',   href: 'https://github.com/ayushman-git' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/ayushman-chakraborty' },
            { label: 'Twitter',  href: 'https://twitter.com/ayushman_dev' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors underline-offset-4 hover:underline"
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-400 to-transparent animate-pulse" />
        <ArrowDown />
      </div>
    </section>
  )
}
