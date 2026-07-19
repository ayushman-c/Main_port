import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import SectionHeading from '../ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const GITHUB_USERNAME = 'ayushman-c'

// Skeleton loader
function Skeleton({ className = '' }) {
  return (
    <div className={`skeleton rounded-lg ${className}`} aria-hidden="true" />
  )
}

// Stat card
function StatCard({ label, value, icon, loading }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>
      <div>
        {loading ? (
          <Skeleton className="h-6 w-16 mb-1.5" />
        ) : (
          <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{value}</p>
        )}
        <p className="text-xs text-zinc-500">{label}</p>
      </div>
    </div>
  )
}

// Repo card
function RepoCard({ repo }) {
  const langColors = {
    JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
    Rust: '#dea584', 'C++': '#f34b7d', Go: '#00ADD8', default: '#8b8b8b',
  }
  const color = langColors[repo.language] ?? langColors.default

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover p-5 block group"
    >
      <div className="flex items-start justify-between mb-2 gap-2">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
          {repo.name}
        </h3>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-500 line-clamp-2 leading-relaxed mb-3">
        {repo.description || 'No description.'}
      </p>
      <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/>
              <circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
              <path d="M18 9a9 9 0 01-9 9"/>
            </svg>
            {repo.forks_count}
          </span>
        )}
      </div>
    </a>
  )
}

export default function GitHub() {
  const [repos,   setRepos]   = useState([])
  const [stats,   setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [chartError, setChartError] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reposRes, statsRes] = await Promise.allSettled([
          axios.get('/api/github/repos'),
          axios.get('/api/github/stats'),
        ])

        if (reposRes.status === 'fulfilled') {
          setRepos(reposRes.value.data.slice(0, 6))
        } else {
          // Fallback to direct GitHub API if backend is down
          const fallbackRepos = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
          setRepos(fallbackRepos.data)
        }
        
        if (statsRes.status === 'fulfilled') {
          setStats(statsRes.value.data)
        } else {
          // Fallback to direct GitHub API if backend is down
          const fallbackUser = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`)
          setStats({
            publicRepos: fallbackUser.data.public_repos,
            followers: fallbackUser.data.followers,
            following: fallbackUser.data.following,
            totalStars: '—', // Can't easily get total stars without backend aggregation
          })
        }
      } catch {
        setError('Unable to load GitHub data.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.github-item', {
        y: 30, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const displayStats = stats ?? {
    publicRepos: '—',
    followers:   '—',
    following:   '—',
    totalStars:  '—',
  }

  return (
    <section id="github" ref={sectionRef} className="section bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container-wide">
        <SectionHeading
          label="Open source"
          title="GitHub Activity"
          subtitle={`@${GITHUB_USERNAME} — contributions, repositories, and open-source work.`}
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 github-item">
          <StatCard label="Repositories"  value={displayStats.publicRepos} icon="📦" loading={loading} />
          <StatCard label="Followers"     value={displayStats.followers}   icon="👥" loading={loading} />
          <StatCard label="Total Stars"   value={displayStats.totalStars}  icon="⭐" loading={loading} />
          <StatCard label="Following"     value={displayStats.following}   icon="🔔" loading={loading} />
        </div>

        {/* Contribution graph embed (GitHub's own SVG) */}
        <div className="github-item mb-12 card p-6 overflow-hidden">
          <p className="section-label mb-4">Contribution Graph</p>
          <div className="overflow-x-auto no-scrollbar">
            {chartError ? (
              <p className="text-sm text-zinc-500 py-4">Contribution graph currently unavailable.</p>
            ) : (
              <img
                src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                alt={`${GITHUB_USERNAME}'s GitHub contribution chart`}
                className="w-full min-w-[600px] rounded-lg dark:invert dark:brightness-50 dark:contrast-125"
                loading="lazy"
                onError={() => setChartError(true)}
              />
            )}
          </div>
        </div>

        {/* Top repos */}
        <div>
          <p className="section-label mb-6">Pinned Repositories</p>

          {error && (
            <p className="text-sm text-zinc-500 text-center py-8">{error}</p>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <div key={repo.id} className="github-item">
                  <RepoCard repo={repo} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg inline-flex"
            >
              View full GitHub profile ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
