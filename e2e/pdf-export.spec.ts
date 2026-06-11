import { test, expect } from '@playwright/test'

test.describe('PDF export', () => {
  test('download PDF button is visible and clickable', async ({ page }) => {
    await page.goto('/matrix/swot')
    const pdfButton = page.getByText('Descargar PDF')
    await expect(pdfButton).toBeVisible()
    await expect(pdfButton).toBeEnabled()
  })

  test('PDF button exists on every matrix page', async ({ page }) => {
    const matrixIds = ['swot', 'bcg', 'ansoff', 'mckinsey', 'eisenhower', 'raci', 'risk', 'value-effort', 'how-might-we', 'empathy-map']
    for (const id of matrixIds) {
      await page.goto(`/matrix/${id}`)
      await expect(page.getByText('Descargar PDF')).toBeVisible()
    }
  })
})
