/**
 * Unit tests for form validation utilities
 */
import {
  validateEmailFormat,
  validateWhatsAppFormat,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateNumberRange,
  validateFutureDate,
  validateUrlFormat,
} from '../formValidation'

describe('validateEmailFormat', () => {
  it('should return error when email is empty', () => {
    const result = validateEmailFormat('')
    expect(result.isValid).toBe(false)
    expect(result.error?.es).toBe('El correo electrónico es requerido')
    expect(result.error?.en).toBe('Email is required')
  })

  it('should return error when email is whitespace only', () => {
    const result = validateEmailFormat('   ')
    expect(result.isValid).toBe(false)
    expect(result.error?.es).toBe('El correo electrónico es requerido')
  })

  it('should validate correct email addresses', () => {
    expect(validateEmailFormat('test@example.com').isValid).toBe(true)
    expect(validateEmailFormat('user.name+tag@example.co.uk').isValid).toBe(true)
    expect(validateEmailFormat('hello@morada.sv').isValid).toBe(true)
  })

  it('should return error for invalid email addresses', () => {
    const invalidEmails = [
      'invalid',
      'invalid@',
      '@example.com',
      'invalid@example',
      'invalid @example.com',
    ]

    invalidEmails.forEach((email) => {
      const result = validateEmailFormat(email)
      expect(result.isValid).toBe(false)
      expect(result.error?.es).toBe('Por favor ingresa un correo electrónico válido')
      expect(result.error?.en).toBe('Please enter a valid email address')
    })
  })
})

describe('validateWhatsAppFormat', () => {
  it('should return error when phone is empty', () => {
    const result = validateWhatsAppFormat('')
    expect(result.isValid).toBe(false)
    expect(result.error?.es).toBe('El número de WhatsApp es requerido')
    expect(result.error?.en).toBe('WhatsApp number is required')
  })

  it('should validate correct Salvadoran phone numbers', () => {
    expect(validateWhatsAppFormat('+503 7123 4567').isValid).toBe(true)
    expect(validateWhatsAppFormat('+50371234567').isValid).toBe(true)
    expect(validateWhatsAppFormat('71234567').isValid).toBe(true)
    expect(validateWhatsAppFormat('6123 4567').isValid).toBe(true)
    expect(validateWhatsAppFormat('+503-7123-4567').isValid).toBe(true)
  })

  it('should return error for invalid phone numbers', () => {
    const invalidPhones = [
      '1234567', // Too short
      '812345678', // Wrong prefix (must be 6 or 7)
      '+1234567890', // Not Salvadoran format
      'abcdefgh', // Letters
    ]

    invalidPhones.forEach((phone) => {
      const result = validateWhatsAppFormat(phone)
      expect(result.isValid).toBe(false)
      expect(result.error?.es).toBe('Por favor ingresa un número válido (ej: +503 7123 4567)')
      expect(result.error?.en).toBe('Please enter a valid number (e.g., +503 7123 4567)')
    })
  })
})

describe('validateRequired', () => {
  it('should return error when value is empty', () => {
    const result = validateRequired('', 'Name')
    expect(result.isValid).toBe(false)
    expect(result.error?.es).toBe('Name es requerido')
    expect(result.error?.en).toBe('Name is required')
  })

  it('should return error when value is whitespace only', () => {
    const result = validateRequired('   ', 'Field')
    expect(result.isValid).toBe(false)
  })

  it('should validate when value is provided', () => {
    expect(validateRequired('Hello', 'Name').isValid).toBe(true)
    expect(validateRequired('123', 'Number').isValid).toBe(true)
  })
})

describe('validateMinLength', () => {
  it('should return error when value is too short', () => {
    const result = validateMinLength('abc', 5, 'Password')
    expect(result.isValid).toBe(false)
    expect(result.error?.es).toBe('Password debe tener al menos 5 caracteres')
    expect(result.error?.en).toBe('Password must be at least 5 characters')
  })

  it('should validate when value meets minimum length', () => {
    expect(validateMinLength('12345', 5, 'Field').isValid).toBe(true)
    expect(validateMinLength('123456', 5, 'Field').isValid).toBe(true)
  })
})

describe('validateMaxLength', () => {
  it('should return error when value is too long', () => {
    const result = validateMaxLength('abcdefghij', 5, 'Username')
    expect(result.isValid).toBe(false)
    expect(result.error?.es).toBe('Username no debe exceder 5 caracteres')
    expect(result.error?.en).toBe('Username must not exceed 5 characters')
  })

  it('should validate when value meets maximum length', () => {
    expect(validateMaxLength('12345', 5, 'Field').isValid).toBe(true)
    expect(validateMaxLength('1234', 5, 'Field').isValid).toBe(true)
  })
})

describe('validateNumberRange', () => {
  it('should return error when value is below minimum', () => {
    const result = validateNumberRange(3, 5, 10, 'Age')
    expect(result.isValid).toBe(false)
    expect(result.error?.es).toBe('Age debe estar entre 5 y 10')
    expect(result.error?.en).toBe('Age must be between 5 and 10')
  })

  it('should return error when value is above maximum', () => {
    const result = validateNumberRange(15, 5, 10, 'Age')
    expect(result.isValid).toBe(false)
  })

  it('should validate when value is within range', () => {
    expect(validateNumberRange(5, 5, 10, 'Age').isValid).toBe(true)
    expect(validateNumberRange(7, 5, 10, 'Age').isValid).toBe(true)
    expect(validateNumberRange(10, 5, 10, 'Age').isValid).toBe(true)
  })
})

describe('validateFutureDate', () => {
  it('should return error when date is in the past', () => {
    const pastDate = '2020-01-01'
    const result = validateFutureDate(pastDate)
    expect(result.isValid).toBe(false)
    expect(result.error?.es).toBe('Por favor selecciona una fecha futura')
    expect(result.error?.en).toBe('Please select a future date')
  })

  it('should validate when date is in the future', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7) // 7 days from now
    const result = validateFutureDate(futureDate.toISOString().split('T')[0])
    expect(result.isValid).toBe(true)
  })

  it('should return error when date is today', () => {
    const today = new Date().toISOString().split('T')[0]
    const result = validateFutureDate(today)
    // Today should fail because we set hours to 0,0,0,0 and compare
    expect(result.isValid).toBe(false)
  })
})

describe('validateUrlFormat', () => {
  it('should validate correct URLs', () => {
    expect(validateUrlFormat('https://morada.sv').isValid).toBe(true)
    expect(validateUrlFormat('http://example.com').isValid).toBe(true)
    expect(validateUrlFormat('https://www.example.com/path?query=1').isValid).toBe(true)
  })

  it('should return error for invalid URLs', () => {
    const result1 = validateUrlFormat('not a url')
    expect(result1.isValid).toBe(false)
    expect(result1.error?.es).toBe('Por favor ingresa una URL válida')
    expect(result1.error?.en).toBe('Please enter a valid URL')

    const result2 = validateUrlFormat('example.com') // Missing protocol
    expect(result2.isValid).toBe(false)
    expect(result2.error?.es).toBe('Por favor ingresa una URL válida')

    const result3 = validateUrlFormat('just some text')
    expect(result3.isValid).toBe(false)
  })
})
