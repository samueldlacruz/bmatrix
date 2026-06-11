import { test, expect } from '@playwright/test'

test.describe('Language switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('default language is Spanish (FODA visible)', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'FODA' })).toBeVisible()
    await expect(page.getByText('Matrices de estrategia empresarial')).toBeVisible()
  })

  test('clicking EN switches to English', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'ES' }).filter({ hasText: 'EN' }).locator('span', { hasText: 'EN' }).click()
    await expect(page.getByRole('heading', { name: 'SWOT' })).toBeVisible()
    await expect(page.getByText('Business strategy matrices')).toBeVisible()
  })

  test('clicking ES switches back to Spanish', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'ES' }).filter({ hasText: 'EN' }).locator('span', { hasText: 'EN' }).click()
    await expect(page.getByRole('heading', { name: 'SWOT' })).toBeVisible()
    await page.locator('button').filter({ hasText: 'ES' }).filter({ hasText: 'EN' }).locator('span', { hasText: 'ES' }).click()
    await expect(page.getByRole('heading', { name: 'FODA' })).toBeVisible()
  })

  test('language persists after navigation', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'ES' }).filter({ hasText: 'EN' }).locator('span', { hasText: 'EN' }).click()
    await expect(page.getByRole('heading', { name: 'SWOT' })).toBeVisible()
    await page.click('a[href="/matrix/swot"]')
    await expect(page.getByRole('heading', { name: 'Strengths' })).toBeVisible()
  })

  test('language persists after page reload', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'ES' }).filter({ hasText: 'EN' }).locator('span', { hasText: 'EN' }).click()
    await expect(page.getByRole('heading', { name: 'SWOT' })).toBeVisible()
    await page.reload()
    await expect(page.getByRole('heading', { name: 'SWOT' })).toBeVisible()
  })

  test('matrix page language toggle works', async ({ page }) => {
    await page.goto('/matrix/swot')
    await expect(page.getByRole('heading', { name: 'Fortalezas' })).toBeVisible()
    const toggle = page.locator('button').filter({ hasText: 'ES' }).filter({ hasText: 'EN' }).first()
    await toggle.evaluate((btn) => (btn as HTMLButtonElement).click())
    await expect(page.getByRole('heading', { name: 'Strengths' })).toBeVisible()
  })
})
