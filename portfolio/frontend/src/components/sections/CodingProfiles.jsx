import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../ui/SectionHeading'
import { certifications } from '../../data/skills'

gsap.registerPlugin(ScrollTrigger)

const LEETCODE_USERNAME = 'ayushman-dev'
const GITHUB_USERNAME   = 'ayushman-c'

const profiles = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    url: `https://leetcode.com/${LEETCODE_USERNAME}`,
    description: 'Algorithmic problem solving & data structures',
    stats: [
      { label: 'Problems Solved', value: '250+' },
      { label: 'Contest Rating',  value: 'Top 20%' },
    ],
    color: '#FFA116',
    bg: 'from-amber-500/10 to-orange-500/5',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="text-[#FFA116]">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    url: `https://github.com/${GITHUB_USERNAME}`,
    description: 'Open source projects & contributions',
    stats: [
      { label: 'Repositories', value: '20+' },
      { label: 'Profile',      value: `@${GITHUB_USERNAME}` },
    ],
    color: '#ffffff',
    bg: 'from-zinc-500/10 to-zinc-500/5',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="text-zinc-900 dark:text-zinc-100">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
]

function CertificationCard({ cert, index }) {
  return (
    <div
      className="cert-card card-hover p-5 flex items-start gap-4"
    >
      <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-2xl flex-shrink-0">
        {cert.badge}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
          {cert.title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">{cert.issuer}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-mono text-zinc-400">{cert.year}</span>
          {cert.url && cert.url !== '#' && (
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors underline"
            >
              View →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CodingProfiles() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.profile-card, .cert-card', {
        y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="profiles" ref={sectionRef} className="section">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Coding profiles */}
          <div>
            <SectionHeading
              label="Competitive programming"
              title="Coding Profiles"
              subtitle="Where I sharpen problem-solving skills."
            />

            <div className="space-y-4">
              {profiles.map((profile) => (
                <a
                  key={profile.id}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`profile-card card-hover p-6 block bg-gradient-to-br ${profile.bg}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-zinc-900 shadow-sm">
                        {profile.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                          {profile.name}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5">{profile.description}</p>
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 flex-shrink-0 mt-1">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    {profile.stats.map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{value}</p>
                        <p className="text-xs text-zinc-500">{label}</p>
                      </div>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <SectionHeading
              label="Learning & growth"
              title="Certifications"
              subtitle="Courses, bootcamps, and professional certifications."
            />

            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <CertificationCard key={cert.id} cert={cert} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
