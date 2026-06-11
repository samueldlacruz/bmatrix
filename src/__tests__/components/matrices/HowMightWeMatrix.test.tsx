import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HowMightWeMatrix, { getHMWDefault } from '../../../components/matrices/HowMightWeMatrix'
import { LanguageProvider } from '../../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('HowMightWeMatrix', () => {
  const defaultData = getHMWDefault()

  it('renders 4 section labels', () => {
    renderWithProviders(
      <HowMightWeMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Necesidades del Usuario')).toBeInTheDocument()
    expect(screen.getByText('Puntos de Dolor')).toBeInTheDocument()
    expect(screen.getByText('Insights')).toBeInTheDocument()
    expect(screen.getByText('Preguntas Cómo Podríamos')).toBeInTheDocument()
  })

  it('renders section emojis', () => {
    renderWithProviders(
      <HowMightWeMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('👤')).toBeInTheDocument()
    expect(screen.getByText('😣')).toBeInTheDocument()
    expect(screen.getByText('💡')).toBeInTheDocument()
    expect(screen.getByText('❓')).toBeInTheDocument()
  })

  it('renders 2×2 grid', () => {
    renderWithProviders(
      <HowMightWeMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    const cells = document.querySelectorAll('.matrix-cell')
    expect(cells.length).toBe(4)
  })

  it('renders default items when data is empty', () => {
    renderWithProviders(
      <HowMightWeMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText(/usuario necesita/)).toBeInTheDocument()
    expect(screen.getByText(/Procesos manuales/)).toBeInTheDocument()
  })

  it('renders editable inputs when editable is true', () => {
    renderWithProviders(
      <HowMightWeMatrix data={defaultData} onChange={() => {}} editable={true} />
    )
    const inputs = document.querySelectorAll('input[type="text"]')
    expect(inputs.length).toBeGreaterThan(0)
  })
})
