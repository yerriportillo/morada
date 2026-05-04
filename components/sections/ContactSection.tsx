import { Button } from '@/components/ui/Button'

interface ContactSectionProps {
  title: string
  whatsapp?: string
  email?: string
  instagram?: string
  address: string
  taxiInstructions: string
  brandColor: string
  labels: {
    getInTouch: string
    whatsapp: string
    email: string
    instagram: string
    address: string
    taxiInstructions: string
    whatsappUs: string
  }
}

export function ContactSection({
  title,
  whatsapp,
  email,
  instagram,
  address,
  taxiInstructions,
  brandColor,
  labels,
}: ContactSectionProps) {
  return (
    <section className="py-20 bg-pacific-mist">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-display font-bold mb-12 text-center"
          style={{ color: brandColor }}
        >
          {title}
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {whatsapp && (
              <div>
                <h3 className="font-semibold text-volcanic-black mb-2">
                  {labels.whatsapp}
                </h3>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-blue hover:underline"
                >
                  {whatsapp}
                </a>
              </div>
            )}

            {email && (
              <div>
                <h3 className="font-semibold text-volcanic-black mb-2">
                  {labels.email}
                </h3>
                <a
                  href={`mailto:${email}`}
                  className="text-ocean-blue hover:underline"
                >
                  {email}
                </a>
              </div>
            )}

            {instagram && (
              <div>
                <h3 className="font-semibold text-volcanic-black mb-2">
                  {labels.instagram}
                </h3>
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-blue hover:underline"
                >
                  @{instagram}
                </a>
              </div>
            )}

            {whatsapp && (
              <Button
                variant="whatsapp"
                className="w-full"
                onClick={() =>
                  window.open(
                    `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`,
                    '_blank'
                  )
                }
              >
                {labels.whatsappUs}
              </Button>
            )}
          </div>

          {/* Location Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-volcanic-black mb-2">
                {labels.address}
              </h3>
              <p className="text-volcanic-black/80">{address}</p>
            </div>

            <div>
              <h3 className="font-semibold text-volcanic-black mb-2">
                {labels.taxiInstructions}
              </h3>
              <p className="text-volcanic-black/80 text-sm leading-relaxed">
                {taxiInstructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
