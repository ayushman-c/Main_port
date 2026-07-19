import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

// Register if available (GSAP Club)
if (typeof SplitText !== 'undefined') {
  gsap.registerPlugin(SplitText)
}

/**
 * Character-by-character reveal animation.
 * Falls back to simple opacity fade if SplitText is unavailable.
 */
export function AnimatedText({ children, className = '', delay = 0, stagger = 0.02 }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay,
        ease: 'power3.out',
      })
    })

    return () => ctx.revert()
  }, [delay, stagger])

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}

/**
 * Typewriter / rotating titles component
 */
export function RotatingTitle({ titles = [], className = '', interval = 3000 }) {
  const ref        = useRef(null)
  const indexRef   = useRef(0)
  const timerRef   = useRef(null)

  useEffect(() => {
    if (!ref.current || titles.length === 0) return

    const el = ref.current

    const cycle = () => {
      const next = titles[(indexRef.current + 1) % titles.length]

      gsap.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          indexRef.current = (indexRef.current + 1) % titles.length
          el.textContent = next
          gsap.fromTo(
            el,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
          )
        },
      })
    }

    // Set initial text
    el.textContent = titles[0]
    timerRef.current = setInterval(cycle, interval)

    return () => {
      clearInterval(timerRef.current)
    }
  }, [titles, interval])

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', minWidth: '20ch' }}
      aria-live="polite"
    />
  )
}
