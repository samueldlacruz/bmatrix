import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RiskMatrix, { getRiskDefault } from '../../../components/matrices/RiskMatrix'
import { LanguageProvider } from '../../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('RiskMatrix', () => {
  const defaultData = getRiskDefault()

  it('renders axis labels', () => {
    renderWithProviders(
      <RiskMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText(/Impacto →/)).toBeInTheDocument()
    expect(screen.getByText(/Probabilidad ↑/)).toBeInTheDocument()
  })

  it('renders likelihood labels', () => {
    renderWithProviders(
      <RiskMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Raro')).toBeInTheDocument()
    expect(screen.getByText('Poco probable')).toBeInTheDocument()
    expect(screen.getByText('Posible')).toBeInTheDocument()
    expect(screen.getByText('Probable')).toBeInTheDocument()
    expect(screen.getByText('Casi Seguro')).toBeInTheDocument()
  })

  it('renders risk legend', () => {
    renderWithProviders(
      <RiskMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Leyenda de Riesgo')).toBeInTheDocument()
    expect(screen.getByText(/Crítico/)).toBeInTheDocument()
    expect(screen.getByText(/Alto/)).toBeInTheDocument()
    expect(screen.getByText(/Medio/)).toBeInTheDocument()
    expect(screen.getByText(/Bajo/)).toBeInTheDocument()
  })

  it('renders 5x5 grid cells', () => {
    renderWithProviders(
      <RiskMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    // 5x5 = 25 cells
    const cells = document.querySelectorAll('.matrix-cell')
    expect(cells.length).toBe(25)
  })
})
