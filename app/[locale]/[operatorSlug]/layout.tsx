import { notFound } from 'next/navigation'
import { mockOperators, type MockOperator } from '@/lib/mockData/operators'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface OperatorLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
    operatorSlug: string
  }>
}

export default async function OperatorLayout({ children, params }: OperatorLayoutProps) {
  const { operatorSlug, locale } = await params
  const currentLocale = locale as 'es' | 'en'

  // Get operator data (mock for now)
  const operator =
    mockOperators[operatorSlug as keyof typeof mockOperators] as MockOperator

  if (!operator) {
    notFound()
  }

  const operatorName =
    typeof operator.name === 'string' ? operator.name : operator.name[currentLocale]

  return (
    <>
      <Header
        operatorSlug={operatorSlug}
        operatorName={operatorName}
        brandColor={operator.brandColor}
        showRegresoLink={operator.regresoModule?.enabled}
      />
      <main className="flex-1">{children}</main>
      <Footer
        operatorSlug={operatorSlug}
        operatorName={operatorName}
        brandColor={operator.brandColor}
      />
    </>
  )
}
