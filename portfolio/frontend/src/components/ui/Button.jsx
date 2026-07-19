import { cn } from '../../utils/cn'

const variants = {
  primary: 'btn-primary',
  ghost:   'btn-ghost',
  outline: 'btn-outline',
}

const sizes = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
}

/**
 * Reusable Button component.
 * @param {'primary'|'ghost'|'outline'} variant
 * @param {'sm'|'md'|'lg'} size
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  as: Tag = 'button',
  ...props
}) {
  return (
    <Tag
      className={cn('btn', variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
