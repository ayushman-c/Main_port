import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initializes Lenis smooth scroll and syncs it with GSAP ScrollTrigger.
 * Respects prefers-reduced-motion.
 */
export function useLenis() {
  useEffect(() => {
    // Respect accessibility preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration:          1.1,
      easing:            (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:       'vertical',
      gestureOrientation: 'vertical',
      smoothWheel:       true,
      wheelMultiplier:   1,
      touchMultiplier:   2,
    })

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    window.lenis = lenis

    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)

    gsap.ticker.lagSmoothing(0)

    // Intercept anchor links for smooth scrolling via event delegation
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a')
      if (!target) return
      
      const href = target.getAttribute('href')
      if (href?.startsWith('#') && href.length > 1) {
        e.preventDefault()
        lenis.scrollTo(href, { offset: -80 }) // Offset for fixed navbar
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
