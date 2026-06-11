import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import McKinseyMatrix, { getMcKinseyDefault } from '../../../components/matrices/McKinseyMatrix'
import { LanguageProvider } from '../../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('McKinseyMatrix', () => {
  const defaultData = getMcKinseyDefault()

  it('renders 3x3 grid (9 cells)', () => {
    renderWithProviders(
      <McKinseyMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    const cells = document.querySelectorAll('.matrix-cell')
    expect(cells.length).toBe(9)
  })

  it('renders column headers with competitive strength labels', () => {
    renderWithProviders(
      <McKinseyMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    const headers = screen.getAllByText(/Fuerza Competitiva:/)
    expect(headers.length).toBe(3)
  })

  it('renders row headers with attractiveness labels', () => {
    renderWithProviders(
      <McKinseyMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    const labels = screen.getAllByText(/Atractividad/)
    expect(labels.length).toBe(3)
  })
})
