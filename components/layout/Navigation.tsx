'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

export function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { key: 'surfGuide', href: `/${locale}/surf-guide` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="text-volcanic-black/80 hover:text-volcanic-black font-medium transition-colors"
          >
            {t(item.key)}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={cn(
            'w-6 h-0.5 bg-volcanic-black transition-all',
            mobileMenuOpen && 'rotate-45 translate-y-2'
          )}
        />
        <span
          className={cn(
            'w-6 h-0.5 bg-volcanic-black transition-all',
            mobileMenuOpen && 'opacity-0'
          )}
        />
        <span
          className={cn(
            'w-6 h-0.5 bg-volcanic-black transition-all',
            mobileMenuOpen && '-rotate-45 -translate-y-2'
          )}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-volcanic-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      <nav
        className={cn(
          'fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col p-6 gap-4">
          <button
            className="self-end text-volcanic-black/60 hover:text-volcanic-black mb-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-lg font-medium text-volcanic-black/80 hover:text-volcanic-black py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
