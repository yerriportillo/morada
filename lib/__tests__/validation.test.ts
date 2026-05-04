/**
 * Unit tests for validation utilities
 */
import {
  requireBothLanguages,
  validateEmail,
  validateWhatsApp,
  validateHexColor,
  validateSlug,
} from '../validation'

describe('requireBothLanguages', () => {
  it('should return error when value is null', () => {
    const result = requireBothLanguages(null, { data: {} })
    expect(result).toBe('Este campo es requerido / This field is required')
  })

  it('should return error when value is undefined', () => {
    const result = requireBothLanguages(undefined, { data: {} })
    expect(result).toBe('Este campo es requerido / This field is required')
  })

  it('should return error when both Spanish and English are empty', () => {
    const result = requireBothLanguages({ es: '', en: '' }, { data: {} })
    expect(result).toBe('Debes proporcionar contenido en español E inglés / You must provide content in both Spanish AND English')
  })

  it('should return error when both Spanish and English are whitespace only', () => {
    const result = requireBothLanguages({ es: '   ', en: '   ' }, { data: {} })
    expect(result).toBe('Debes proporcionar contenido en español E inglés / You must provide content in both Spanish AND English')
  })

  it('should return error when Spanish is missing', () => {
    const result = requireBothLanguages({ es: '', en: 'Hello' }, { data: {} })
    expect(result).toBe('Falta la versión en español / Spanish version is missing')
  })

  it('should return error when Spanish is only whitespace', () => {
    const result = requireBothLanguages({ es: '   ', en: 'Hello' }, { data: {} })
    expect(result).toBe('Falta la versión en español / Spanish version is missing')
  })

  it('should return error when English is missing', () => {
    const result = requireBothLanguages({ es: 'Hola', en: '' }, { data: {} })
    expect(result).toBe('Falta la versión en inglés / English version is missing')
  })

  it('should return error when English is only whitespace', () => {
    const result = requireBothLanguages({ es: 'Hola', en: '   ' }, { data: {} })
    expect(result).toBe('Falta la versión en inglés / English version is missing')
  })

  it('should return true when both languages are provided', () => {
    const result = requireBothLanguages(
      { es: 'Hola Mundo', en: 'Hello World' },
      { data: {} }
    )
    expect(result).toBe(true)
  })

  it('should trim whitespace and validate correctly', () => {
    const result = requireBothLanguages(
      { es: '  Hola  ', en: '  Hello  ' },
      { data: {} }
    )
    expect(result).toBe(true)
  })
})

describe('validateEmail', () => {
  it('should return true for empty value (optional field)', () => {
    expect(validateEmail('')).toBe(true)
  })

  it('should validate correct email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('user.name+tag@example.co.uk')).toBe(true)
    expect(validateEmail('hello@morada.sv')).toBe(true)
  })

  it('should reject invalid email addresses', () => {
    const errorMessage = 'Formato de email inválido / Invalid email format'
    expect(validateEmail('invalid')).toBe(errorMessage)
    expect(validateEmail('invalid@')).toBe(errorMessage)
    expect(validateEmail('@example.com')).toBe(errorMessage)
    expect(validateEmail('invalid@example')).toBe(errorMessage)
    expect(validateEmail('invalid @example.com')).toBe(errorMessage)
  })
})

describe('validateWhatsApp', () => {
  it('should return true for empty value (optional field)', () => {
    expect(validateWhatsApp('')).toBe(true)
  })

  it('should validate correct E.164 format numbers', () => {
    expect(validateWhatsApp('+50312345678')).toBe(true)
    expect(validateWhatsApp('+1234567890')).toBe(true)
    expect(validateWhatsApp('+447911123456')).toBe(true)
  })

  it('should reject invalid WhatsApp numbers', () => {
    const errorMessage = 'Usar formato E.164 (ej: +50312345678) / Use E.164 format (e.g., +50312345678)'
    expect(validateWhatsApp('1234567890')).toBe(errorMessage) // Missing +
    expect(validateWhatsApp('+0123456789')).toBe(errorMessage) // Starts with 0
    expect(validateWhatsApp('+1')).toBe(errorMessage) // Too short (minimum 2 digits)
    expect(validateWhatsApp('+1234567890123456')).toBe(errorMessage) // Too long (>15 digits)
    expect(validateWhatsApp('+1 234 567 8901')).toBe(errorMessage) // Contains spaces
    expect(validateWhatsApp('+1-234-567-8901')).toBe(errorMessage) // Contains hyphens
  })
})

describe('validateHexColor', () => {
  it('should return true for empty value (optional field)', () => {
    expect(validateHexColor('')).toBe(true)
  })

  it('should validate correct hex color codes', () => {
    expect(validateHexColor('#1A6B8A')).toBe(true)
    expect(validateHexColor('#000000')).toBe(true)
    expect(validateHexColor('#FFFFFF')).toBe(true)
    expect(validateHexColor('#1a6b8a')).toBe(true) // Lowercase
    expect(validateHexColor('#AbCdEf')).toBe(true) // Mixed case
  })

  it('should reject invalid hex color codes', () => {
    const errorMessage = 'Usar formato hex (#1A6B8A) / Use hex format (#1A6B8A)'
    expect(validateHexColor('1A6B8A')).toBe(errorMessage) // Missing #
    expect(validateHexColor('#1A6B8')).toBe(errorMessage) // Too short (5 chars)
    expect(validateHexColor('#1A6B8AA')).toBe(errorMessage) // Too long (7 chars)
    expect(validateHexColor('#GGGGGG')).toBe(errorMessage) // Invalid characters
    expect(validateHexColor('# 1A6B8A')).toBe(errorMessage) // Contains space
  })
})

describe('validateSlug', () => {
  it('should return error for empty value (required field)', () => {
    expect(validateSlug('')).toBe('Slug es requerido / Slug is required')
  })

  it('should validate correct slugs', () => {
    expect(validateSlug('puro-surf')).toBe(true)
    expect(validateSlug('simple')).toBe(true)
    expect(validateSlug('multi-word-slug')).toBe(true)
    expect(validateSlug('slug123')).toBe(true)
    expect(validateSlug('123-456')).toBe(true)
  })

  it('should reject invalid slugs', () => {
    const errorMessage = 'Solo minúsculas y guiones (ej: puro-surf) / Only lowercase and hyphens (e.g., puro-surf)'
    expect(validateSlug('Puro-Surf')).toBe(errorMessage) // Uppercase
    expect(validateSlug('puro_surf')).toBe(errorMessage) // Underscore
    expect(validateSlug('puro surf')).toBe(errorMessage) // Space
    expect(validateSlug('puro--surf')).toBe(errorMessage) // Double hyphen
    expect(validateSlug('-puro-surf')).toBe(errorMessage) // Leading hyphen
    expect(validateSlug('puro-surf-')).toBe(errorMessage) // Trailing hyphen
    expect(validateSlug('puro.surf')).toBe(errorMessage) // Dot
    expect(validateSlug('puro/surf')).toBe(errorMessage) // Slash
  })
})
