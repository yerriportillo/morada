import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

interface FooterProps {
  operatorSlug?: string
  operatorName?: string
  brandColor?: string
}

export function Footer({ operatorSlug, operatorName, brandColor }: FooterProps) {
  const t = useTranslations('footer')
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-volcanic-black/10 bg-sand-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-display font-bold text-xl"
                style={{ backgroundColor: brandColor || '#1A6B8A' }}
              >
                {operatorName ? operatorName[0].toUpperCase() : 'M'}
              </div>
              <span className="text-xl font-display font-semibold text-volcanic-black">
                {operatorName || 'Morada'}
              </span>
            </div>
            <p className="text-volcanic-black/60 text-sm max-w-sm">{t('tagline')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-volcanic-black mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/surf-guide`}
                  className="text-volcanic-black/60 hover:text-volcanic-black transition-colors"
                >
                  {t('operators')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-volcanic-black/60 hover:text-volcanic-black transition-colors"
                >
                  {t('forOperators')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-volcanic-black/60 hover:text-volcanic-black transition-colors"
                >
                  {t('joinMorada')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Legal */}
          <div>
            <h4 className="font-semibold text-volcanic-black mb-4">{t('help')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-volcanic-black/60 hover:text-volcanic-black transition-colors"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-volcanic-black/60 hover:text-volcanic-black transition-colors"
                >
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-volcanic-black/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-volcanic-black/60">
            © {currentYear} {operatorName || 'Morada'}. {t('builtWith')}
          </p>
          {!operatorSlug && (
            <p className="text-sm text-volcanic-black/40">{t('poweredBy')}</p>
          )}
        </div>
      </div>
    </footer>
  )
}
