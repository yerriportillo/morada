'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Navigation } from './Navigation'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { Button } from '../ui/Button'
import { useTranslations } from 'next-intl'

interface HeaderProps {
  operatorSlug?: string
  operatorName?: string
  brandColor?: string
  showRegresoLink?: boolean
}

export function Header({ operatorSlug, operatorName, brandColor, showRegresoLink }: HeaderProps) {
  const locale = useLocale()
  const t = useTranslations('nav')

  const homeHref = operatorSlug ? `/${locale}/${operatorSlug}` : `/${locale}`
  const regresoHref = operatorSlug ? `/${locale}/${operatorSlug}/regreso` : null

  return (
    <header className="sticky top-0 z-30 w-full border-b border-volcanic-black/10 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={homeHref} className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-display font-bold text-xl"
              style={{ backgroundColor: brandColor || '#1A6B8A' }}
            >
              {operatorName ? operatorName[0].toUpperCase() : 'M'}
            </div>
            <span className="text-xl font-display font-semibold text-volcanic-black hidden sm:block">
              {operatorName || 'Morada'}
            </span>
          </Link>

          {/* Center Navigation */}
          <Navigation />

          {/* Right Side: Regreso Link + Language Switcher + Book Button */}
          <div className="flex items-center gap-3">
            {showRegresoLink && regresoHref && (
              <Link
                href={regresoHref}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pacific-mist hover:bg-ocean-blue/10 transition-colors text-sm font-medium"
                style={{ color: brandColor }}
              >
                <span>🇸🇻</span>
                <span>Regreso</span>
              </Link>
            )}
            <LanguageSwitcher />
            {operatorSlug && (
              <Button
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
                style={{ backgroundColor: brandColor }}
              >
                {t('book')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
