import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      primary:
        'bg-ocean-blue text-white hover:bg-ocean-blue/90 active:bg-ocean-blue/80 shadow-sm',
      secondary:
        'bg-volcanic-black text-white hover:bg-volcanic-black/90 active:bg-volcanic-black/80 shadow-sm',
      outline:
        'border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue/5 active:bg-ocean-blue/10',
      ghost:
        'text-volcanic-black hover:bg-volcanic-black/5 active:bg-volcanic-black/10',
      whatsapp:
        'bg-whatsapp text-white hover:bg-whatsapp/90 active:bg-whatsapp/80 shadow-sm',
    }

    const sizes = {
      sm: 'text-sm px-3 py-1.5 h-8',
      md: 'text-base px-4 py-2.5 h-10',
      lg: 'text-lg px-6 py-3 h-12',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
