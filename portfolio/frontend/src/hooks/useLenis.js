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

    const tick = gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
