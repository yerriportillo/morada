/**
 * Loading State Component
 *
 * Full-page or inline loading state with spinner animation
 */

interface LoadingStateProps {
  message?: string
  fullPage?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingState({
  message = 'Loading...',
  fullPage = false,
  size = 'md',
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div
        className={`${sizeClasses[size]} border-4 border-ocean-blue/20 border-t-ocean-blue rounded-full animate-spin`}
        role="status"
        aria-label={message}
      />

      {/* Message */}
      {message && (
        <p className="text-sm text-volcanic-black/60 font-medium">{message}</p>
      )}

      {/* Screen reader text */}
      <span className="sr-only">{message}</span>
    </div>
  )

  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-white">
        {content}
      </div>
    )
  }

  return <div className="py-12">{content}</div>
}
