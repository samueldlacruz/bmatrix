import { test, expect } from '@playwright/test'

test.describe('Matrix navigation', () => {
  test('navigates to SWOT/FODA matrix', async ({ page }) => {
    await page.goto('/matrix/swot')
    await expect(page.getByRole('heading', { name: 'Fortalezas' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Debilidades' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Oportunidades' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Amenazas' })).toBeVisible()
  })

  test('navigates to BCG matrix', async ({ page }) => {
    await page.goto('/matrix/bcg')
    await expect(page.getByRole('heading', { name: 'Estrellas' })).toBeVisible()
  })

  test('navigates to Ansoff matrix', async ({ page }) => {
    await page.goto('/matrix/ansoff')
    await expect(page.getByRole('heading', { name: 'Penetración de Mercado' })).toBeVisible()
  })

  test('navigates to McKinsey matrix', async ({ page }) => {
    await page.goto('/matrix/mckinsey')
    await expect(page.locator('.matrix-cell')).toHaveCount(9)
  })

  test('navigates to Eisenhower matrix', async ({ page }) => {
    await page.goto('/matrix/eisenhower')
    await expect(page.getByRole('heading', { name: 'Hacer Primero' })).toBeVisible()
  })

  test('navigates to RACI matrix', async ({ page }) => {
    await page.goto('/matrix/raci')
    await expect(page.locator('table')).toBeVisible()
    await expect(page.locator('th', { hasText: 'Tarea' })).toBeVisible()
  })

  test('navigates to Risk matrix', async ({ page }) => {
    await page.goto('/matrix/risk')
    await expect(page.getByRole('heading', { name: 'Leyenda de Riesgo' })).toBeVisible()
  })

  test('navigates to Value vs Effort matrix', async ({ page }) => {
    await page.goto('/matrix/value-effort')
    await expect(page.getByRole('heading', { name: 'Ganancias Rápidas' })).toBeVisible()
  })

  test('navigates to How Might We matrix', async ({ page }) => {
    await page.goto('/matrix/how-might-we')
    await expect(page.getByRole('heading', { name: 'Necesidades del Usuario' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Preguntas Cómo Podríamos' })).toBeVisible()
  })

  test('navigates to Empathy Map matrix', async ({ page }) => {
    await page.goto('/matrix/empathy-map')
    await expect(page.getByRole('heading', { name: 'Dice' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Siente' })).toBeVisible()
  })

  test('shows not found for invalid matrix', async ({ page }) => {
    await page.goto('/matrix/invalid')
    await expect(page.getByRole('heading', { name: 'Matriz no encontrada' })).toBeVisible()
  })

  test('home link navigates back to home', async ({ page }) => {
    await page.goto('/matrix/swot')
    await page.click('text=← Inicio')
    await expect(page).toHaveURL('/')
  })
})
