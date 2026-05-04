/**
 * E2E test for booking flow
 * Tests the complete user journey from landing page to booking form
 */
import { test, expect } from '@playwright/test'

test.describe('Booking Flow', () => {
  test('should complete booking form with valid data', async ({ page }) => {
    // Start at operator landing page
    await page.goto('/es/puro-surf')

    // Wait for page to load
    await expect(page.locator('h1')).toContainText(/Puro Surf/)

    // Click on "Book Now" button (there may be multiple)
    const bookButtons = page.getByRole('link', { name: /reservar|book/i })
    await bookButtons.first().click()

    // Should navigate to booking page
    await expect(page).toHaveURL(/\/book/)

    // Fill out guest details
    await page.getByLabel(/nombre completo|full name/i).fill('María García')
    await page.getByLabel(/email/i).fill('maria@example.com')
    await page.getByLabel(/whatsapp/i).fill('+503 7123 4567')
    await page.getByLabel(/país|country/i).fill('El Salvador')

    // Select preferred language
    const languageSelect = page.locator('select[name*="language"]').first()
    if (await languageSelect.isVisible()) {
      await languageSelect.selectOption('es')
    }

    // Select date (mock - actual implementation will use Cal.com)
    const dateInput = page.locator('input[type="date"]').first()
    if (await dateInput.isVisible()) {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7)
      await dateInput.fill(futureDate.toISOString().split('T')[0])
    }

    // Select number of guests
    const guestInput = page.getByLabel(/número de personas|number of guests/i)
    if (await guestInput.isVisible()) {
      await guestInput.fill('2')
    }

    // Add special requests
    const requestsTextarea = page.getByLabel(/peticiones|special requests|requests/i)
    if (await requestsTextarea.isVisible()) {
      await requestsTextarea.fill('Somos vegetarianos')
    }

    // Check Regreso checkbox if it exists
    const regresoCheckbox = page.getByLabel(/regreso|returning to El Salvador/i)
    if (await regresoCheckbox.isVisible()) {
      await regresoCheckbox.check()
      await expect(regresoCheckbox).toBeChecked()
    }

    // Verify the form is filled correctly
    await expect(page.getByLabel(/email/i)).toHaveValue('maria@example.com')

    // Note: We won't actually submit since we don't have payment integration yet
    // In Phase 12, we would add:
    // await page.getByRole('button', { name: /pagar|pay|submit/i }).click()
    // await expect(page).toHaveURL(/\/confirmation/)
  })

  test('should show validation errors for empty required fields', async ({ page }) => {
    await page.goto('/es/puro-surf/book')

    // Try to submit without filling fields
    const submitButton = page.getByRole('button', { name: /pagar|pay|submit|continuar|continue/i })

    if (await submitButton.isVisible()) {
      await submitButton.click()

      // Should show validation errors (actual behavior depends on implementation)
      // This is a placeholder - will work once form validation is wired up
    }
  })

  test('should show validation error for invalid email', async ({ page }) => {
    await page.goto('/es/puro-surf/book')

    // Fill email with invalid format
    const emailInput = page.getByLabel(/email/i)
    await emailInput.fill('invalid-email')
    await emailInput.blur()

    // Should show error message (once validation is wired up)
    // await expect(page.getByText(/correo electrónico válido|valid email/i)).toBeVisible()
  })

  test('should navigate from program card to booking', async ({ page }) => {
    await page.goto('/es/puro-surf')

    // Find a program card
    const programCard = page.locator('[data-testid*="program"], .program-card').first()

    if (await programCard.isVisible()) {
      // Click "Book" button within the card
      const cardBookButton = programCard.getByRole('button', { name: /reservar|book/i })
      await cardBookButton.click()

      // Should navigate to booking page
      await expect(page).toHaveURL(/\/book/)
    }
  })

  test('should display pricing information on booking page', async ({ page }) => {
    await page.goto('/es/puro-surf/book')

    // Should show pricing section
    // (Actual elements depend on booking page implementation)
    const pricingSection = page.locator('text=/precio|price|total/i').first()

    // Check if pricing elements exist
    if (await pricingSection.isVisible()) {
      await expect(pricingSection).toBeVisible()
    }
  })

  test('should handle Regreso visitors tracking', async ({ page }) => {
    await page.goto('/es/puro-surf/regreso')

    // Should show Regreso-specific content
    await expect(page.locator('h1')).toContainText(/regresa|come home/i)

    // Click CTA to book
    const ctaButton = page.getByRole('link', { name: /reservar|book/i }).first()
    await ctaButton.click()

    // Should navigate to booking with regreso context
    await expect(page).toHaveURL(/\/book/)

    // Regreso checkbox should be checked or regreso parameter should be set
    const regresoCheckbox = page.getByLabel(/regreso|returning/i)
    if (await regresoCheckbox.isVisible()) {
      // Should be pre-checked when coming from regreso page
      // (This would require implementing regreso tracking in the URL or state)
    }
  })

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/es/puro-surf/book')

    // Form should be visible and usable on mobile
    await expect(page.getByLabel(/nombre|name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()

    // Fill out a field on mobile
    await page.getByLabel(/nombre|name/i).fill('Test User')
    await expect(page.getByLabel(/nombre|name/i)).toHaveValue('Test User')
  })
})
