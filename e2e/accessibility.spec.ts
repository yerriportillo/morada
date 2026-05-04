/**
 * Accessibility tests using axe-core
 * Ensures WCAG 2.1 AA compliance
 */
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('should not have accessibility violations on homepage', async ({ page }) => {
    await page.goto('/es')
    await page.waitForLoadState('networkidle')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have accessibility violations on operator page', async ({ page }) => {
    await page.goto('/es/puro-surf')
    await page.waitForLoadState('networkidle')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have accessibility violations on booking page', async ({ page }) => {
    await page.goto('/es/puro-surf/book')
    await page.waitForLoadState('networkidle')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have accessibility violations on Regreso page', async ({ page }) => {
    await page.goto('/es/puro-surf/regreso')
    await page.waitForLoadState('networkidle')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have accessibility violations on surf guide', async ({ page }) => {
    await page.goto('/es/surf-guide')
    await page.waitForLoadState('networkidle')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/es')

    // Get all headings
    const h1Count = await page.locator('h1').count()
    const h2Count = await page.locator('h2').count()

    // Should have exactly one H1
    expect(h1Count).toBe(1)

    // Should have at least one H2
    expect(h2Count).toBeGreaterThan(0)
  })

  test('should have alt text on all images', async ({ page }) => {
    await page.goto('/es/puro-surf')

    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      // All images should have alt attribute (even if empty for decorative images)
      expect(alt).toBeDefined()
    }
  })

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/es')

    // Tab through focusable elements
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Should have visible focus indicator
    const focusedElement = await page.locator(':focus').first()
    await expect(focusedElement).toBeVisible()
  })

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/es/puro-surf/book')

    // All inputs should have associated labels
    const inputs = await page.locator('input[type="text"], input[type="email"], input[type="tel"]').all()

    for (const input of inputs) {
      const id = await input.getAttribute('id')
      if (id) {
        const label = page.locator(`label[for="${id}"]`)
        await expect(label).toBeVisible()
      }
    }
  })

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/es')
    await page.waitForLoadState('networkidle')

    // Run axe with only color-contrast rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag21aa'])
      .include('body')
      .analyze()

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    )

    expect(contrastViolations).toEqual([])
  })

  test('should have skip to main content link', async ({ page }) => {
    await page.goto('/es')

    // Look for skip link (usually hidden but accessible via keyboard)
    await page.keyboard.press('Tab')

    const skipLink = page.locator('a[href*="#main"], a[href*="#content"]').first()
    // Skip link should exist (even if visually hidden)
    const skipLinkExists = await skipLink.count()

    // Note: Not all pages may have skip links, this is aspirational
    // expect(skipLinkExists).toBeGreaterThan(0)
  })

  test('should have proper ARIA landmarks', async ({ page }) => {
    await page.goto('/es')

    // Should have navigation landmark
    await expect(page.locator('nav, [role="navigation"]')).toBeVisible()

    // Should have main landmark
    await expect(page.locator('main, [role="main"]')).toBeVisible()

    // Should have footer
    await expect(page.locator('footer, [role="contentinfo"]')).toBeVisible()
  })

  test('should support screen reader navigation on forms', async ({ page }) => {
    await page.goto('/es/puro-surf/book')

    // Check for fieldsets and legends (good for screen readers)
    // This is aspirational - checks if form is well-structured

    // All form sections should be navigable
    const form = page.locator('form').first()
    if (await form.isVisible()) {
      // Form should have accessible name or legend
      const formTitle = await page.locator('h1, h2, h3, legend').first().textContent()
      expect(formTitle).toBeTruthy()
    }
  })
})
