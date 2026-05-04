import { TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-volcanic-black mb-1.5"
          >
            {label}
            {props.required && <span className="text-sunset-coral ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border border-volcanic-black/20 bg-white px-3 py-2',
            'text-base text-volcanic-black placeholder:text-volcanic-black/40',
            'transition-colors resize-y',
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

Textarea.displayName = 'Textarea'
