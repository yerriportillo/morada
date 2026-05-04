/**
 * Smoke tests - Basic checks that all main pages load without errors
 */
import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
  test('should load the homepage in Spanish', async ({ page }) => {
    await page.goto('/es')

    // Check that the page loaded successfully
    await expect(page).toHaveTitle(/Morada/)

    // Check for key marketing elements
    await expect(page.locator('h1')).toContainText(/plataforma/)
  })

  test('should load the homepage in English', async ({ page }) => {
    await page.goto('/en')

    await expect(page).toHaveTitle(/Morada/)

    // Check for key marketing elements in English
    await expect(page.locator('h1')).toContainText(/platform/)
  })

  test('should load operator landing page (Puro Surf)', async ({ page }) => {
    await page.goto('/es/puro-surf')

    // Should show operator name
    await expect(page.locator('h1')).toContainText(/Puro Surf/)

    // Should have navigation
    await expect(page.getByRole('navigation')).toBeVisible()
  })

  test('should load surf guide page', async ({ page }) => {
    await page.goto('/es/surf-guide')

    // Should show surf spots
    await expect(page.locator('h1')).toContainText(/Surf Guide|Guía de Surf/i)
  })

  test('should load Regreso page', async ({ page }) => {
    await page.goto('/es/puro-surf/regreso')

    // Should show regreso content
    await expect(page.locator('h1')).toContainText(/Regresa|Come Home/i)
  })

  test('should navigate between languages', async ({ page }) => {
    await page.goto('/es')

    // Find and click language switcher (if it exists in header)
    // For now, just verify both language versions are accessible
    await page.goto('/en')
    await expect(page).toHaveURL(/\/en/)

    await page.goto('/es')
    await expect(page).toHaveURL(/\/es/)
  })

  test('should have no console errors on homepage', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/es')

    // Wait for page to fully load
    await page.waitForLoadState('networkidle')

    // Should have no console errors
    expect(errors).toHaveLength(0)
  })

  test('should have responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/es')

    // Page should still load correctly
    await expect(page.locator('h1')).toBeVisible()
  })
})
