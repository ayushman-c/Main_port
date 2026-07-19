import { useEffect, useRef, useState } from 'react'

/**
 * Custom cursor — follows mouse with spring lag.
 * Hidden on touch devices (handled via CSS media query).
 */
export default function Cursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const posRef   = useRef({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    // Smooth ring follows with RAF
    let rafId
    let rx = 0, ry = 0
    const animate = () => {
      rx += (posRef.current.x - rx) * 0.15
      ry += (posRef.current.y - ry) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    // Hover detection
    const over = (e) => {
      const el = e.target
      if (el.matches('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]')) {
        setHovered(true)
      }
    }
    const out = () => setHovered(false)

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Dot — follows instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`hidden md:block pointer-events-none fixed top-0 left-0 z-[9999]
                    rounded-full transition-[width,height,opacity] duration-150
                    ${hovered ? 'w-2 h-2 bg-white dark:bg-white' : 'w-1.5 h-1.5 bg-zinc-900 dark:bg-white'}`}
        style={{ willChange: 'transform' }}
      />
      {/* Ring — springs behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`hidden md:block pointer-events-none fixed top-0 left-0 z-[9998]
                    rounded-full border transition-[width,height,opacity,border-color] duration-200
                    ${hovered
                      ? 'w-10 h-10 border-zinc-900 dark:border-white opacity-60'
                      : 'w-7 h-7 border-zinc-400 dark:border-zinc-500 opacity-40'
                    }`}
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
