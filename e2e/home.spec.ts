import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads and shows BMatrix title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('BMatrix')
  })

  test('renders 10 matrix cards', async ({ page }) => {
    const cards = page.locator('a[href^="/matrix/"]')
    await expect(cards).toHaveCount(10)
  })

  test('renders hero section', async ({ page }) => {
    await expect(page.getByText('Matrices de estrategia empresarial')).toBeVisible()
    await expect(page.getByText('Explorar Matrices')).toBeVisible()
  })

  test('renders language toggle', async ({ page }) => {
    const toggle = page.locator('button').filter({ hasText: 'ES' }).filter({ hasText: 'EN' })
    await expect(toggle).toBeVisible()
  })

  test('clicking a matrix card navigates to matrix page', async ({ page }) => {
    await page.click('a[href="/matrix/swot"]')
    await expect(page).toHaveURL(/\/matrix\/swot/)
    await expect(page.getByRole('heading', { name: 'FODA' })).toBeVisible()
  })

  test('renders footer', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible()
  })
})
