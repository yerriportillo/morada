# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke Tests >> should load surf guide page
- Location: e2e/smoke.spec.ts:36:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected pattern: /Surf Guide|Guía de Surf/i
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')
    2 × waiting for" http://localhost:3005/es/surf-guide" navigation to finish...
      - navigated to "http://localhost:3005/es/surf-guide"
    - waiting for" http://localhost:3005/es/surf-guide" navigation to finish...

```

# Test source

```ts
  1  | /**
  2  |  * Smoke tests - Basic checks that all main pages load without errors
  3  |  */
  4  | import { test, expect } from '@playwright/test'
  5  | 
  6  | test.describe('Smoke Tests', () => {
  7  |   test('should load the homepage in Spanish', async ({ page }) => {
  8  |     await page.goto('/es')
  9  | 
  10 |     // Check that the page loaded successfully
  11 |     await expect(page).toHaveTitle(/Morada/)
  12 | 
  13 |     // Check for key marketing elements
  14 |     await expect(page.locator('h1')).toContainText(/plataforma/)
  15 |   })
  16 | 
  17 |   test('should load the homepage in English', async ({ page }) => {
  18 |     await page.goto('/en')
  19 | 
  20 |     await expect(page).toHaveTitle(/Morada/)
  21 | 
  22 |     // Check for key marketing elements in English
  23 |     await expect(page.locator('h1')).toContainText(/platform/)
  24 |   })
  25 | 
  26 |   test('should load operator landing page (Puro Surf)', async ({ page }) => {
  27 |     await page.goto('/es/puro-surf')
  28 | 
  29 |     // Should show operator name
  30 |     await expect(page.locator('h1')).toContainText(/Puro Surf/)
  31 | 
  32 |     // Should have navigation
  33 |     await expect(page.getByRole('navigation')).toBeVisible()
  34 |   })
  35 | 
  36 |   test('should load surf guide page', async ({ page }) => {
  37 |     await page.goto('/es/surf-guide')
  38 | 
  39 |     // Should show surf spots
> 40 |     await expect(page.locator('h1')).toContainText(/Surf Guide|Guía de Surf/i)
     |                                      ^ Error: expect(locator).toContainText(expected) failed
  41 |   })
  42 | 
  43 |   test('should load Regreso page', async ({ page }) => {
  44 |     await page.goto('/es/puro-surf/regreso')
  45 | 
  46 |     // Should show regreso content
  47 |     await expect(page.locator('h1')).toContainText(/Regresa|Come Home/i)
  48 |   })
  49 | 
  50 |   test('should navigate between languages', async ({ page }) => {
  51 |     await page.goto('/es')
  52 | 
  53 |     // Find and click language switcher (if it exists in header)
  54 |     // For now, just verify both language versions are accessible
  55 |     await page.goto('/en')
  56 |     await expect(page).toHaveURL(/\/en/)
  57 | 
  58 |     await page.goto('/es')
  59 |     await expect(page).toHaveURL(/\/es/)
  60 |   })
  61 | 
  62 |   test('should have no console errors on homepage', async ({ page }) => {
  63 |     const errors: string[] = []
  64 |     page.on('console', (msg) => {
  65 |       if (msg.type() === 'error') {
  66 |         errors.push(msg.text())
  67 |       }
  68 |     })
  69 | 
  70 |     await page.goto('/es')
  71 | 
  72 |     // Wait for page to fully load
  73 |     await page.waitForLoadState('networkidle')
  74 | 
  75 |     // Should have no console errors
  76 |     expect(errors).toHaveLength(0)
  77 |   })
  78 | 
  79 |   test('should have responsive design on mobile', async ({ page }) => {
  80 |     // Set mobile viewport
  81 |     await page.setViewportSize({ width: 375, height: 667 })
  82 | 
  83 |     await page.goto('/es')
  84 | 
  85 |     // Page should still load correctly
  86 |     await expect(page.locator('h1')).toBeVisible()
  87 |   })
  88 | })
  89 | 
```