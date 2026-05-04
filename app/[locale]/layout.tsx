import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Morada — The platform for the small dwellings of El Salvador',
  description:
    "White-label tourism booking platform for El Salvador's surf camps, eco-lodges, tour operators, and community cooperatives.",
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Fetch messages for the current locale
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {/* Operator pages have their own layout with Header/Footer */}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
