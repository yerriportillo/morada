/**
 * Form Validation Utilities
 *
 * Client-side validation functions for forms
 * Provides bilingual error messages (ES/EN)
 */

export interface ValidationResult {
  isValid: boolean
  error?: {
    es: string
    en: string
  }
}

/**
 * Validate email format
 */
export function validateEmailFormat(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email || email.trim().length === 0) {
    return {
      isValid: false,
      error: {
        es: 'El correo electrónico es requerido',
        en: 'Email is required',
      },
    }
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: {
        es: 'Por favor ingresa un correo electrónico válido',
        en: 'Please enter a valid email address',
      },
    }
  }

  return { isValid: true }
}

/**
 * Validate WhatsApp phone number format
 */
export function validateWhatsAppFormat(phone: string): ValidationResult {
  // Accepts formats: +503 7123 4567, +50371234567, 71234567, etc.
  const phoneRegex = /^(\+503)?[\s-]?[67]\d{3}[\s-]?\d{4}$/

  if (!phone || phone.trim().length === 0) {
    return {
      isValid: false,
      error: {
        es: 'El número de WhatsApp es requerido',
        en: 'WhatsApp number is required',
      },
    }
  }

  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return {
      isValid: false,
      error: {
        es: 'Por favor ingresa un número válido (ej: +503 7123 4567)',
        en: 'Please enter a valid number (e.g., +503 7123 4567)',
      },
    }
  }

  return { isValid: true }
}

/**
 * Validate required field
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || value.trim().length === 0) {
    return {
      isValid: false,
      error: {
        es: `${fieldName} es requerido`,
        en: `${fieldName} is required`,
      },
    }
  }

  return { isValid: true }
}

/**
 * Validate minimum length
 */
export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string
): ValidationResult {
  if (value.length < minLength) {
    return {
      isValid: false,
      error: {
        es: `${fieldName} debe tener al menos ${minLength} caracteres`,
        en: `${fieldName} must be at least ${minLength} characters`,
      },
    }
  }

  return { isValid: true }
}

/**
 * Validate maximum length
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string
): ValidationResult {
  if (value.length > maxLength) {
    return {
      isValid: false,
      error: {
        es: `${fieldName} no debe exceder ${maxLength} caracteres`,
        en: `${fieldName} must not exceed ${maxLength} characters`,
      },
    }
  }

  return { isValid: true }
}

/**
 * Validate number range
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName: string
): ValidationResult {
  if (value < min || value > max) {
    return {
      isValid: false,
      error: {
        es: `${fieldName} debe estar entre ${min} y ${max}`,
        en: `${fieldName} must be between ${min} and ${max}`,
      },
    }
  }

  return { isValid: true }
}

/**
 * Validate date is in the future
 */
export function validateFutureDate(dateString: string): ValidationResult {
  const selectedDate = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    return {
      isValid: false,
      error: {
        es: 'Por favor selecciona una fecha futura',
        en: 'Please select a future date',
      },
    }
  }

  return { isValid: true }
}

/**
 * Validate URL format
 */
export function validateUrlFormat(url: string): ValidationResult {
  try {
    new URL(url)
    return { isValid: true }
  } catch {
    return {
      isValid: false,
      error: {
        es: 'Por favor ingresa una URL válida',
        en: 'Please enter a valid URL',
      },
    }
  }
}
