'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { mockSurfSpots } from '@/lib/mockData/surfSpots'
import { SurfSpotCard } from '@/components/sections/SurfSpotCard'
import { Select } from '@/components/ui/Select'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function SurfGuidePage() {
  const t = useTranslations()
  const locale = useLocale()
  const currentLocale = locale as 'es' | 'en'

  const [filterSkillLevel, setFilterSkillLevel] = useState<string>('all')
  const [filterRegion, setFilterRegion] = useState<string>('all')
  const [filterBreakType, setFilterBreakType] = useState<string>('all')

  // Filter spots
  const filteredSpots = mockSurfSpots.filter((spot) => {
    if (filterSkillLevel !== 'all' && spot.skillLevel !== filterSkillLevel) return false
    if (filterRegion !== 'all' && spot.region !== filterRegion) return false
    if (filterBreakType !== 'all' && spot.breakType !== filterBreakType) return false
    return true
  })

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="bg-ocean-blue text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              {t('surf.guide.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t('surf.guide.subtitle')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Filters */}
          <div className="mb-8 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Select
              label={t('surf.guide.filterByLevel')}
              value={filterSkillLevel}
              onChange={(e) => setFilterSkillLevel(e.target.value)}
              options={[
                { value: 'all', label: t('common.showAll') },
                { value: 'beginner', label: t('surf.levels.beginner') },
                { value: 'intermediate', label: t('surf.levels.intermediate') },
                { value: 'advanced', label: t('surf.levels.advanced') },
              ]}
            />

            <Select
              label={t('surf.guide.filterByRegion')}
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              options={[
                { value: 'all', label: t('common.showAll') },
                { value: 'la_libertad', label: t('surf.regions.la_libertad') },
                { value: 'eastern', label: t('surf.regions.eastern') },
                { value: 'western', label: t('surf.regions.western') },
              ]}
            />

            <Select
              label={t('surf.guide.filterByBreakType')}
              value={filterBreakType}
              onChange={(e) => setFilterBreakType(e.target.value)}
              options={[
                { value: 'all', label: t('common.showAll') },
                { value: 'point', label: t('surf.breakTypes.point') },
                { value: 'beach', label: t('surf.breakTypes.beach') },
                { value: 'reef', label: t('surf.breakTypes.reef') },
                { value: 'river_mouth', label: t('surf.breakTypes.river_mouth') },
              ]}
            />
          </div>

          {/* Results Count */}
          <div className="text-center mb-6 text-volcanic-black/60">
            {filteredSpots.length === mockSurfSpots.length ? (
              <p>
                {currentLocale === 'es'
                  ? `Mostrando ${filteredSpots.length} spots de surf`
                  : `Showing ${filteredSpots.length} surf spots`}
              </p>
            ) : (
              <p>
                {currentLocale === 'es'
                  ? `${filteredSpots.length} de ${mockSurfSpots.length} spots`
                  : `${filteredSpots.length} of ${mockSurfSpots.length} spots`}
              </p>
            )}
          </div>

          {/* Surf Spots Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.map((spot) => (
              <SurfSpotCard
                key={spot.slug}
                slug={spot.slug}
                name={spot.name}
                region={spot.region}
                breakType={spot.breakType}
                skillLevel={spot.skillLevel}
                bestSeason={spot.bestSeason}
                bestTide={spot.bestTide}
                crowdRating={spot.crowdRating}
                notes={spot.notes[currentLocale]}
                locale={locale}
                labels={{
                  breakType: t('surf.spot.breakType'),
                  skillLevel: t('surf.spot.skillLevel'),
                  bestSeason: t('surf.spot.bestSeason'),
                  bestTide: t('surf.spot.bestTide'),
                  crowdRating: t('surf.spot.crowdRating'),
                  viewDetails: t('cta.learnMore'),
                }}
                breakTypeLabels={{
                  point: t('surf.breakTypes.point'),
                  beach: t('surf.breakTypes.beach'),
                  reef: t('surf.breakTypes.reef'),
                  river_mouth: t('surf.breakTypes.river_mouth'),
                }}
                skillLevelLabels={{
                  beginner: t('surf.levels.beginner'),
                  intermediate: t('surf.levels.intermediate'),
                  advanced: t('surf.levels.advanced'),
                  all: t('surf.levels.all'),
                }}
                tideLabels={{
                  low: t('surf.tides.low'),
                  mid: t('surf.tides.mid'),
                  high: t('surf.tides.high'),
                  all: t('surf.tides.all'),
                }}
                regionLabels={{
                  la_libertad: t('surf.regions.la_libertad'),
                  eastern: t('surf.regions.eastern'),
                  western: t('surf.regions.western'),
                }}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredSpots.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-volcanic-black/60">
                {currentLocale === 'es'
                  ? 'No se encontraron spots con estos filtros'
                  : 'No spots found with these filters'}
              </p>
              <button
                onClick={() => {
                  setFilterSkillLevel('all')
                  setFilterRegion('all')
                  setFilterBreakType('all')
                }}
                className="mt-4 text-ocean-blue hover:underline"
              >
                {t('common.clear')} {t('common.filter')}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
