interface PhotoCollageProps {
  title?: string
  subtitle?: string
}

export function PhotoCollage({ title, subtitle }: PhotoCollageProps) {
  // Placeholder images - will be replaced with real photos in production
  const placeholderImages = [
    { color: '#1A6B8A', label: 'Playa' },
    { color: '#2D3561', label: 'Volcán' },
    { color: '#E07050', label: 'Atardecer' },
    { color: '#1A6B8A', label: 'Surf' },
    { color: '#2D3561', label: 'Pueblo' },
    { color: '#E07050', label: 'Cultura' },
  ]

  return (
    <section className="py-20 bg-sand-white">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-volcanic-black mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-volcanic-black/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {placeholderImages.map((img, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-xl aspect-square
                ${index === 0 || index === 4 ? 'md:col-span-2 md:row-span-2' : ''}
                group cursor-pointer
              `}
            >
              {/* Placeholder */}
              <div
                className="w-full h-full flex items-center justify-center text-white font-display text-2xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: img.color }}
              >
                {img.label}
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-volcanic-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
