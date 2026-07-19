import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Attach a GSAP scroll-triggered reveal animation to the returned ref.
 * @param {object} options - GSAP from-vars and ScrollTrigger config.
 */
export function useGsapReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const {
      fromVars = { y: 40, opacity: 0 },
      duration = 0.8,
      ease = 'power3.out',
      trigger = ref.current,
      start = 'top 85%',
    } = options

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...fromVars,
        duration,
        ease,
        scrollTrigger: {
          trigger,
          start,
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}
