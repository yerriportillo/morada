import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-volcanic-black mb-1.5"
          >
            {label}
            {props.required && <span className="text-sunset-coral ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'flex h-10 w-full rounded-lg border border-volcanic-black/20 bg-white px-3 py-2',
            'text-base text-volcanic-black',
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-ocean-blue focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-volcanic-black/5',
            error && 'border-sunset-coral focus:ring-sunset-coral',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-sm text-sunset-coral">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-volcanic-black/60">{helperText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
