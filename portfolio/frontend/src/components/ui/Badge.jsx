import { cn } from '../../utils/cn'

export default function Badge({ children, className = '', dot = false }) {
  return (
    <span className={cn('badge', className)}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 flex-shrink-0" />
      )}
      {children}
    </span>
  )
}
