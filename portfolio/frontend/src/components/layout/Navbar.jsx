import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { cn } from '../../utils/cn'
import { gsap } from 'gsap'
import { useRef } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  
  { label: 'Contact',  href: '#contact' },
]

const SECTION_IDS = ['about', 'skills', 'projects', 'github', 'contact']

// Sun icon
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

// Moon icon
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [hideNav,   setHideNav]   = useState(false)
  const lastY = useRef(0)
  const navRef = useRef(null)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const activeId = useScrollSpy(SECTION_IDS)

  // Scroll behavior — hide on scroll down, show on scroll up
  const handleScroll = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 20)
    if (y > 80) {
      setHideNav(y > lastY.current && y > 200)
    }
    lastY.current = y
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50'
            : 'bg-transparent',
          hideNav && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        )}
        role="banner"
      >
        <nav
          className="container-wide py-4 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            className="text-sm font-mono font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:opacity-70 transition-opacity"
            aria-label="Ayushman Chakraborty — Home"
          >
            ayushman<span className="opacity-40">.</span>dev
          </Link>

          {/* Desktop links */}
          {isHome && (
            <ul className="hidden md:flex items-center gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.replace('#', '')
                const isActive = activeId === id
                return (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className={cn(
                        'relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200',
                        isActive
                          ? 'text-zinc-900 dark:text-zinc-100'
                          : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                      )}
                    >
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-zinc-800"
                          style={{ zIndex: -1 }}
                        />
                      )}
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Resume CTA */}
            <Link
              to="/resume"
              className="hidden md:inline-flex btn btn-primary btn-sm"
            >
              Resume
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <span aria-hidden="true" className="block w-4 relative h-3.5">
                <span className={cn(
                  'absolute left-0 h-0.5 w-full bg-current rounded-full transition-all duration-300',
                  menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                )} />
                <span className={cn(
                  'absolute left-0 top-1.5 h-0.5 bg-current rounded-full transition-all duration-300',
                  menuOpen ? 'w-0 opacity-0' : 'w-full opacity-100'
                )} />
                <span className={cn(
                  'absolute left-0 h-0.5 w-full bg-current rounded-full transition-all duration-300',
                  menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                )} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <nav
          className={cn(
            'absolute top-0 right-0 bottom-0 w-72 bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 px-8 pt-24 pb-8 transition-transform duration-300',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              to="/resume"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary w-full justify-center"
            >
              View Resume
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
