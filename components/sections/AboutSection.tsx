interface AboutSectionProps {
  title: string
  content: string
  brandColor: string
}

export function AboutSection({ title, content, brandColor }: AboutSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-4xl font-display font-bold mb-6 text-center"
            style={{ color: brandColor }}
          >
            {title}
          </h2>
          <div className="prose prose-lg mx-auto text-volcanic-black/80 leading-relaxed">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
