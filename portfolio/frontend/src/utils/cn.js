/**
 * Lightweight class-name utility.
 * Joins truthy string arguments and deduplicates values.
 *
 * Usage:
 *   cn('base', isActive && 'active', 'another')
 *   // => 'base active another'
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
