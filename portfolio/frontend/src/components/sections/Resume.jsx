import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

// Download icon
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

// Eye icon
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

const HIGHLIGHTS = [
  { label: 'B.Tech CSE',       desc: 'Narula Institute of Technology, 2nd Year' },
  { label: 'Full Stack',       desc: 'React, Node.js, Express, MongoDB, PostgreSQL' },
  { label: 'Blockchain',       desc: 'Stellar, Soroban smart contracts, Rust' },
  { label: 'AI / ML',         desc: 'Python, PyTorch, scikit-learn, TinyML' },
  { label: 'Open Source',      desc: '20+ repositories on GitHub' },
  { label: 'DSA',              desc: '250+ LeetCode problems solved' },
]

const handleDownload = async () => {
  try {
    // Track download via backend
    await fetch((import.meta.env.VITE_API_URL || '') + '/api/resume/download', { method: 'POST' }).catch(() => {})
  } catch { /* silent */ }
}

export default function Resume() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.resume-reveal', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="resume" ref={sectionRef} className="section">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="space-y-6">
            <div className="resume-reveal">
              <p className="section-label mb-3">My credentials</p>
              <h2 className="section-title leading-tight mb-4">Resume</h2>
              <p className="section-subtitle">
                Second-year B.Tech student with hands-on experience in full stack development,
                blockchain systems, and AI/ML engineering.
              </p>
            </div>

            {/* Highlights grid */}
            <div className="resume-reveal grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HIGHLIGHTS.map(({ label, desc }) => (
                <div
                  key={label}
                  className="card p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{label}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="resume-reveal flex flex-wrap gap-3">
              <MagneticButton>
                <a
                  href="/assets/resume/resume.pdf"
                  download="Ayushman_Chakraborty_Resume.pdf"
                  onClick={handleDownload}
                  className="btn btn-primary btn-lg"
                  aria-label="Download Ayushman's resume as PDF"
                >
                  <DownloadIcon />
                  Download PDF
                </a>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/resume"
                  className="btn btn-ghost btn-lg"
                  aria-label="Preview resume online"
                >
                  <EyeIcon />
                  Preview Online
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Right — Visual resume preview card */}
          <div className="resume-reveal">
            <div className="card p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }}
                aria-hidden="true"
              />

              {/* Resume mockup header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-400" aria-hidden="true" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" aria-hidden="true" />
                  <div className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                      Ayushman Chakraborty
                    </h3>
                    <p className="text-sm text-zinc-500 mt-0.5">Full Stack · Blockchain · AI/ML Developer</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-lg font-black text-zinc-600 dark:text-zinc-400 select-none">
                    AC
                  </div>
                </div>
              </div>

              <div className="divider mb-5" />

              {/* Mock content lines */}
              <div className="space-y-4">
                {['Education', 'Experience', 'Projects', 'Skills', 'Certifications'].map((section) => (
                  <div key={section}>
                    <p className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2">{section}</p>
                    <div className="space-y-1.5">
                      <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 w-full" />
                      <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-900 w-4/5" />
                      {section === 'Projects' && (
                        <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-900 w-3/5" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
                  PDF · 1 Page · ATS Optimized
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
