import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-volcanic-black mb-1.5"
          >
            {label}
            {props.required && <span className="text-sunset-coral ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-lg border border-volcanic-black/20 bg-white px-3 py-2',
            'text-base text-volcanic-black placeholder:text-volcanic-black/40',
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-ocean-blue focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-volcanic-black/5',
            error && 'border-sunset-coral focus:ring-sunset-coral',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-sunset-coral">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-volcanic-black/60">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
