import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in the viewport.
 * @param {string[]} sectionIds - Array of element IDs to spy on.
 * @param {number}   offset     - Top offset in pixels (default 80 for navbar height).
 * @returns {string} The currently active section ID.
 */
export function useScrollSpy(sectionIds, offset = 80) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: `-${offset}px 0px -60% 0px`,
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds, offset])

  return activeId
}
