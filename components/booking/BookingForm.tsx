'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'

interface BookingFormProps {
  itemName: string
  priceUsd: number
  depositPercent: number
  brandColor: string
  initialRegresoVisitor?: boolean
  labels: {
    title: string
    guestDetails: string
    bookingDetails: string
    paymentDetails: string
    name: string
    namePlaceholder: string
    email: string
    emailPlaceholder: string
    whatsapp: string
    whatsappPlaceholder: string
    country: string
    countryPlaceholder: string
    language: string
    selectDate: string
    numGuests: string
    numGuestsPlaceholder: string
    specialRequests: string
    specialRequestsPlaceholder: string
    regresoQuestion: string
    regresoHelper: string
    subtotal: string
    deposit: string
    remaining: string
    total: string
    bookNow: string
  }
  languageOptions: { value: string; label: string }[]
  onSubmit?: (data: BookingFormData) => void
}

export interface BookingFormData {
  name: string
  email: string
  whatsapp: string
  country: string
  language: string
  date: string
  numGuests: number
  specialRequests: string
  regresoVisitor: boolean
}

export function BookingForm({
  itemName,
  priceUsd,
  depositPercent,
  brandColor,
  initialRegresoVisitor = false,
  labels,
  languageOptions,
  onSubmit,
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    whatsapp: '',
    country: '',
    language: 'es',
    date: '',
    numGuests: 1,
    specialRequests: '',
    regresoVisitor: initialRegresoVisitor,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'number'
          ? parseInt(value) || 1
          : type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      regresoVisitor: e.target.checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  // Calculate pricing
  const subtotal = priceUsd * formData.numGuests
  const depositAmount = subtotal * (depositPercent / 100)
  const remainingAmount = subtotal - depositAmount

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Guest Details */}
      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="text-xl">{labels.guestDetails}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <Input
            label={labels.name}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={labels.namePlaceholder}
            required
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label={labels.email}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={labels.emailPlaceholder}
              required
            />
            <Input
              label={labels.whatsapp}
              name="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder={labels.whatsappPlaceholder}
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label={labels.country}
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder={labels.countryPlaceholder}
              required
            />
            <Select
              label={labels.language}
              name="language"
              value={formData.language}
              onChange={handleChange}
              options={languageOptions}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card variant="bordered">
        <CardHeader>
          <CardTitle className="text-xl">{labels.bookingDetails}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label={labels.selectDate}
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <Input
              label={labels.numGuests}
              name="numGuests"
              type="number"
              min="1"
              max="20"
              value={formData.numGuests}
              onChange={handleChange}
              placeholder={labels.numGuestsPlaceholder}
              required
            />
          </div>
          <Textarea
            label={labels.specialRequests}
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder={labels.specialRequestsPlaceholder}
            rows={3}
          />

          {/* CRITICAL: Regreso Checkbox for Diaspora Tracking */}
          <div className="pt-4 border-t border-volcanic-black/10">
            <Checkbox
              name="regresoVisitor"
              checked={formData.regresoVisitor}
              onChange={handleCheckboxChange}
              label={labels.regresoQuestion}
              helperText={labels.regresoHelper}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="text-xl">{labels.paymentDetails}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-6">
          <div className="flex justify-between text-volcanic-black/80">
            <span>{labels.subtotal}</span>
            <span className="font-medium">${subtotal.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between text-volcanic-black/80">
            <span>
              {labels.deposit.replace('{percent}', depositPercent.toString())}
            </span>
            <span className="font-medium">${depositAmount.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between text-sm text-volcanic-black/60">
            <span>{labels.remaining}</span>
            <span>${remainingAmount.toFixed(2)} USD</span>
          </div>
          <div className="pt-3 border-t-2 border-volcanic-black/10 flex justify-between text-lg font-bold">
            <span>{labels.total}</span>
            <span style={{ color: brandColor }}>${depositAmount.toFixed(2)} USD</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            className="mt-6"
            style={{ backgroundColor: brandColor }}
          >
            {labels.bookNow}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
