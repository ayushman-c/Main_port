import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { label: 'Projects Built',     value: '10+' },
  { label: 'GitHub Repositories', value: '20+' },
  { label: 'DSA Problems Solved', value: '250+' },
  { label: 'Year of Study',       value: '2nd' },
]

const INTERESTS = [
  { icon: '⚛️', label: 'Full Stack Development' },
  { icon: '🔗', label: 'Blockchain & Web3' },
  { icon: '🤖', label: 'AI / ML Research' },
  { icon: '🎨', label: 'UI / UX Design' },
  { icon: '📐', label: 'Systems Architecture' },
  { icon: '⚡', label: 'Performance Engineering' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="container-wide">
        <SectionHeading
          label="Who I am"
          title="About Me"
          className="about-reveal"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text column */}
          <div className="space-y-6">
            <div className="about-reveal space-y-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                I&apos;m{' '}
                <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">
                  Ayushman Chakraborty
                </strong>
                , a second-year B.Tech student at{' '}
                <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">
                  Narula Institute of Technology
                </strong>
                , passionate about building software that matters.
              </p>
              <p>
                I work across the full stack — from crafting pixel-perfect React interfaces
                to designing scalable Node.js APIs. My recent focus has been the intersection
                of blockchain and AI, building systems where trustless smart contracts
                and intelligent agents work together.
              </p>
              <p>
                On the blockchain side, I specialize in the{' '}
                <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Stellar</strong>{' '}
                ecosystem and Soroban smart contracts. In AI/ML, I work with PyTorch, edge inference
                with TinyML, and local RAG systems — keeping models out of the cloud when possible.
              </p>
              <p>
                I care deeply about engineering quality: clean architecture, thoughtful APIs,
                and code that other developers can actually maintain.
              </p>
            </div>

            {/* Interest tags */}
            <div className="about-reveal flex flex-wrap gap-2 pt-2">
              {INTERESTS.map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Stats + avatar column */}
          <div className="space-y-8">
            {/* Avatar card */}
            <div className="about-reveal relative w-fit">
              <div className="w-52 h-52 rounded-3xl bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-7xl font-black text-zinc-500 dark:text-zinc-400 select-none shadow-xl">
                AC
              </div>
              {/* Availability badge */}
              <div className="absolute -bottom-3 -right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md text-xs font-medium text-zinc-700 dark:text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Open to opportunities
              </div>
            </div>

            {/* Stats grid */}
            <div className="about-reveal grid grid-cols-2 gap-4">
              {STATS.map(({ label, value }) => (
                <div
                  key={label}
                  className="card p-5 flex flex-col gap-1"
                >
                  <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {value}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-500">{label}</span>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="about-reveal card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-lg flex-shrink-0">
                🎓
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  B.Tech — Computer Science &amp; Engineering
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-0.5">
                  Narula Institute of Technology · 2nd Year
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
