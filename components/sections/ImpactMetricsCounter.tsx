'use client'

import { useEffect, useRef, useState } from 'react'

interface ImpactMetric {
  label: {
    es: string
    en: string
  }
  value: number
  unit: {
    es: string
    en: string
  }
  icon: string // Emoji or icon
}

interface ImpactMetricsCounterProps {
  metrics: ImpactMetric[]
  locale: 'es' | 'en'
  title?: string
  subtitle?: string
}

/**
 * Impact Metrics Counter Component
 *
 * Displays conservation and community impact metrics with
 * animated counters that increment when scrolled into view.
 *
 * Used by eco-lodges (refugio) and community cooperatives (comunidad)
 * to showcase their positive impact.
 *
 * Features:
 * - Animated counter (0 → target value)
 * - Intersection Observer trigger
 * - Icon + label + value + unit display
 */
export function ImpactMetricsCounter({
  metrics,
  locale,
  title,
  subtitle,
}: ImpactMetricsCounterProps) {
  if (metrics.length === 0) return null

  return (
    <section className="py-16 bg-pacific-mist">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-volcanic-black mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-volcanic-black/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Individual Metric Card with Animated Counter
 */
function MetricCard({ metric, locale }: { metric: ImpactMetric; locale: 'es' | 'en' }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Intersection Observer to trigger animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [isVisible])

  // Animate counter when visible
  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const fps = 60
    const totalFrames = (duration / 1000) * fps
    const increment = metric.value / totalFrames

    let frame = 0
    const timer = setInterval(() => {
      frame++
      setCount(Math.min(Math.round(increment * frame), metric.value))

      if (frame >= totalFrames) {
        clearInterval(timer)
        setCount(metric.value) // Ensure final value is exact
      }
    }, 1000 / fps)

    return () => clearInterval(timer)
  }, [isVisible, metric.value])

  return (
    <div
      ref={ref}
      className="text-center p-6 bg-white rounded-lg shadow-sm border border-ocean-blue/10 hover:shadow-md transition-shadow"
    >
      {/* Icon */}
      <div className="text-5xl mb-3">{metric.icon}</div>

      {/* Animated Counter */}
      <div className="text-4xl font-bold text-ocean-blue mb-2">
        {count.toLocaleString()}
      </div>

      {/* Unit */}
      <div className="text-sm font-medium text-volcanic-black/70 mb-1">
        {metric.unit[locale]}
      </div>

      {/* Label */}
      <div className="text-xs text-volcanic-black/60">{metric.label[locale]}</div>
    </div>
  )
}
