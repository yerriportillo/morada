/**
 * Validation utilities for Morada
 * Ensures bilingual content quality
 */

/**
 * Validates that both Spanish and English are provided for a localized field
 * Use this for critical user-facing content
 */
export const requireBothLanguages = (value: any, { data }: any) => {
  // For localized fields, Payload stores as { es: string, en: string }
  if (!value) {
    return 'Este campo es requerido / This field is required'
  }

  const hasSpanish = value.es && value.es.trim().length > 0
  const hasEnglish = value.en && value.en.trim().length > 0

  if (!hasSpanish && !hasEnglish) {
    return 'Debes proporcionar contenido en español E inglés / You must provide content in both Spanish AND English'
  }

  if (!hasSpanish) {
    return 'Falta la versión en español / Spanish version is missing'
  }

  if (!hasEnglish) {
    return 'Falta la versión en inglés / English version is missing'
  }

  return true
}

/**
 * Validates email format
 */
export const validateEmail = (value: string | string[] | null | undefined): string | true => {
  if (!value || (Array.isArray(value) && value.length === 0)) return true // Optional field
  const stringValue = Array.isArray(value) ? value[0] : value
  if (!stringValue) return true
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(stringValue) || 'Formato de email inválido / Invalid email format'
}

/**
 * Validates WhatsApp number (E.164 format)
 */
export const validateWhatsApp = (value: string | string[] | null | undefined): string | true => {
  if (!value || (Array.isArray(value) && value.length === 0)) return true // Optional field
  const stringValue = Array.isArray(value) ? value[0] : value
  if (!stringValue) return true
  const e164Regex = /^\+[1-9]\d{1,14}$/
  return e164Regex.test(stringValue) || 'Usar formato E.164 (ej: +50312345678) / Use E.164 format (e.g., +50312345678)'
}

/**
 * Validates hex color code
 */
export const validateHexColor = (value: string | string[] | null | undefined): string | true => {
  if (!value || (Array.isArray(value) && value.length === 0)) return true
  const stringValue = Array.isArray(value) ? value[0] : value
  if (!stringValue) return true
  const hexRegex = /^#[0-9A-Fa-f]{6}$/
  return hexRegex.test(stringValue) || 'Usar formato hex (#1A6B8A) / Use hex format (#1A6B8A)'
}

/**
 * Validates URL slug (lowercase, hyphenated)
 */
export const validateSlug = (value: string | string[] | null | undefined): string | true => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return 'Slug es requerido / Slug is required'
  }

  // Handle array case (shouldn't happen for text fields, but TypeScript requires it)
  const stringValue = Array.isArray(value) ? value[0] : value

  if (!stringValue) return 'Slug es requerido / Slug is required'

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(stringValue) || 'Solo minúsculas y guiones (ej: puro-surf) / Only lowercase and hyphens (e.g., puro-surf)'
}
