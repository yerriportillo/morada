'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/i18n'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    // Remove the current locale from the pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '')
    // Navigate to the new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`)
  }

  return (
    <div className="flex items-center gap-2 bg-sand-white border border-volcanic-black/10 rounded-lg p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`
            px-3 py-1.5 rounded-md text-sm font-medium transition-all
            ${
              locale === loc
                ? 'bg-ocean-blue text-white'
                : 'text-volcanic-black/60 hover:text-volcanic-black hover:bg-volcanic-black/5'
            }
          `}
          aria-label={`Switch to ${loc === 'es' ? 'Spanish' : 'English'}`}
        >
          {loc === 'es' ? 'ES' : 'EN'}
        </button>
      ))}
    </div>
  )
}
