import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../ui/SectionHeading'
import { skillCategories, allSkillTags } from '../../data/skills'

gsap.registerPlugin(ScrollTrigger)

function SkillBar({ name, level, index }) {
  const barRef = useRef(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      }
    )
  }, [level, index])

  return (
    <li className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{name}</span>
        <span className="text-xs font-mono text-zinc-400">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name}: ${level}%`}
          style={{ width: 0 }}
        />
      </div>
    </li>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-header', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-header', start: 'top 80%', once: true },
      })
      gsap.from('.skills-card', {
        y: 40, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      })
      gsap.from('.skills-tag', {
        scale: 0.8, opacity: 0, duration: 0.4, ease: 'back.out(1.7)', stagger: 0.03,
        scrollTrigger: { trigger: '.skills-tag-cloud', start: 'top 85%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="section bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container-wide">
        <div className="skills-header">
          <SectionHeading
            label="What I work with"
            title="Skills & Technologies"
            subtitle="Grouped by domain — from frontend rendering to on-chain smart contracts."
          />
        </div>

        {/* Skill category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="skills-card card p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <h3 className="text-sm font-mono font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mb-5">
                {cat.label}
              </h3>
              <ul className="space-y-4">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tag cloud */}
        <div className="skills-tag-cloud">
          <p className="section-label mb-6 text-center">All technologies</p>
          <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
            {allSkillTags.map((tag) => (
              <span
                key={tag}
                className="skills-tag badge"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
