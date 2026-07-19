import { cn } from '../../utils/cn'

/**
 * Consistent section heading with optional label and subtitle.
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignClass = {
    left:   'text-left',
    center: 'text-center mx-auto',
    right:  'text-right ml-auto',
  }[align]

  return (
    <div className={cn('max-w-2xl mb-16', alignClass, className)}>
      {label && (
        <p className="section-label mb-3">{label}</p>
      )}
      <h2 className="section-title leading-tight mb-4">{title}</h2>
      {subtitle && (
        <p className="section-subtitle">{subtitle}</p>
      )}
    </div>
  )
}
