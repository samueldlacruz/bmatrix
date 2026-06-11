import { test, expect } from '@playwright/test'

test.describe('Matrix editing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/matrix/swot')
  })

  test('SWOT: typing in strengths input updates value', async ({ page }) => {
    const input = page.locator('.matrix-cell input').first()
    await input.fill('Mi fortaleza')
    await expect(input).toHaveValue('Mi fortaleza')
  })

  test('SWOT: clicking + Add adds a new row', async ({ page }) => {
    const addButtons = page.locator('text=+ Agregar')
    const initialCount = await page.locator('.matrix-cell').first().locator('li').count()
    await addButtons.first().click()
    const newCount = await page.locator('.matrix-cell').first().locator('li').count()
    expect(newCount).toBeGreaterThan(initialCount)
  })

  test('SWOT: clicking x removes an item', async ({ page }) => {
    const removeBtn = page.locator('.matrix-cell button:has-text("×")').first()
    const initialCount = await page.locator('.matrix-cell').first().locator('li').count()
    await removeBtn.click()
    const newCount = await page.locator('.matrix-cell').first().locator('li').count()
    expect(newCount).toBeLessThan(initialCount)
  })

  test('lock button toggles to edit mode', async ({ page }) => {
    await page.click('text=🔒 Bloquear')
    await expect(page.getByText('✏️ Editar')).toBeVisible()
    const inputs = page.locator('input[type="text"]')
    await expect(inputs).toHaveCount(0)
  })

  test('BCG: Add Product button works', async ({ page }) => {
    await page.goto('/matrix/bcg')
    const initialProducts = await page.locator('input[type="text"]').count()
    await page.click('text=+ Agregar Producto')
    const newProducts = await page.locator('input[type="text"]').count()
    expect(newProducts).toBeGreaterThan(initialProducts)
  })

  test('RACI: renders table with selects', async ({ page }) => {
    await page.goto('/matrix/raci')
    const selects = page.locator('select')
    await expect(selects.first()).toBeVisible()
  })

  test('Risk: 5x5 grid is rendered', async ({ page }) => {
    await page.goto('/matrix/risk')
    const cells = page.locator('.matrix-cell')
    await expect(cells).toHaveCount(25)
  })
})
