import { useRef } from 'react'
import { cn } from '../../utils/cn'

/**
 * Magnetic button — follows cursor on hover.
 * GPU-friendly: uses transform only.
 */
export default function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
  const ref     = useRef(null)
  const rafRef  = useRef(null)

  const handleMouseMove = (e) => {
    const btn  = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (e.clientX - cx) * strength
    const dy   = (e.clientY - cy) * strength

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      btn.style.transform = `translate(${dx}px, ${dy}px)`
    })
  }

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current)
    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px)'
      ref.current.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = ''
    }, 400)
  }

  const handleMouseEnter = () => {
    if (ref.current) ref.current.style.transition = ''
  }

  return (
    <div
      ref={ref}
      className={cn('inline-block', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </div>
  )
}
