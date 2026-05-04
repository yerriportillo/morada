# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Smoke Tests >> should load the homepage in Spanish
- Location: e2e/smoke.spec.ts:7:7

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Morada/
Received string:  ""
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    3 × unexpected value ""
    - waiting for" http://localhost:3005/es" navigation to finish...
    - navigated to "http://localhost:3005/es"
    4 × unexpected value ""

```

# Page snapshot

```yaml
- generic:
  - generic [active]:
    - generic [ref=e5] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e6]:
        - img [ref=e7]
      - generic [ref=e10]:
        - button "Open issues overlay" [ref=e11]:
          - generic [ref=e12]:
            - generic [ref=e13]: "0"
            - generic [ref=e14]: "1"
          - generic [ref=e15]: Issue
        - button "Collapse issues badge" [ref=e16]:
          - img [ref=e17]
    - generic [ref=e21]:
      - generic [ref=e22]:
        - generic [ref=e23]:
          - navigation [ref=e24]:
            - button "previous" [disabled] [ref=e25]:
              - img "previous" [ref=e26]
            - generic [ref=e28]:
              - generic [ref=e29]: 1/
              - text: "1"
            - button "next" [disabled] [ref=e30]:
              - img "next" [ref=e31]
          - img
        - generic [ref=e33]:
          - link "Next.js 15.4.11 (outdated) Webpack" [ref=e34] [cursor=pointer]:
            - /url: https://nextjs.org/docs/messages/version-staleness
            - img [ref=e35]
            - generic "An outdated version detected (latest is 16.2.4), upgrade is highly recommended!" [ref=e37]: Next.js 15.4.11 (outdated)
            - generic [ref=e38]: Webpack
          - img
      - generic [ref=e39]:
        - dialog "Runtime Error" [ref=e40]:
          - generic [ref=e44]:
            - generic [ref=e45]:
              - generic [ref=e47]: Runtime Error
              - generic [ref=e48]:
                - button "Copy Stack Trace" [ref=e49] [cursor=pointer]:
                  - img [ref=e50]
                - button "No related documentation found" [disabled] [ref=e52]:
                  - img [ref=e53]
                - link "Learn more about enabling Node.js inspector for server code with Chrome DevTools" [ref=e55] [cursor=pointer]:
                  - /url: https://nextjs.org/docs/app/building-your-application/configuring/debugging#server-side-code
                  - img [ref=e56]
            - paragraph [ref=e65]: "ENOENT: no such file or directory, open '/Users/yerri/Dropbox/morada-project/morada/.next/server/pages/_document.js'"
          - generic [ref=e67]:
            - generic [ref=e68]: "1"
            - generic [ref=e69]: "2"
        - contentinfo [ref=e70]:
          - region "Error feedback" [ref=e71]:
            - paragraph [ref=e72]:
              - link "Was this helpful?" [ref=e73] [cursor=pointer]:
                - /url: https://nextjs.org/telemetry#error-feedback
            - button "Mark as helpful" [ref=e74] [cursor=pointer]:
              - img [ref=e75]
            - button "Mark as not helpful" [ref=e78] [cursor=pointer]:
              - img [ref=e79]
  - alert [ref=e81]
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
> 11 |     await expect(page).toHaveTitle(/Morada/)
     |                        ^ Error: expect(page).toHaveTitle(expected) failed
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
  40 |     await expect(page.locator('h1')).toContainText(/Surf Guide|Guía de Surf/i)
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