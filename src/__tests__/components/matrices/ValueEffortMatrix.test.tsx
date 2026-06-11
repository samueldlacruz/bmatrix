import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ValueEffortMatrix, { getVEDefault } from '../../../components/matrices/ValueEffortMatrix'
import { LanguageProvider } from '../../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('ValueEffortMatrix', () => {
  const defaultData = getVEDefault()

  it('renders 4 quadrant labels', () => {
    renderWithProviders(
      <ValueEffortMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Ganancias Rápidas')).toBeInTheDocument()
    expect(screen.getByText('Proyectos Mayores')).toBeInTheDocument()
    expect(screen.getByText('Rellenos')).toBeInTheDocument()
    expect(screen.getByText('Tareas Ingratas')).toBeInTheDocument()
  })

  it('renders axis labels', () => {
    renderWithProviders(
      <ValueEffortMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Bajo Esfuerzo')).toBeInTheDocument()
    expect(screen.getByText('Alto Esfuerzo →')).toBeInTheDocument()
    expect(screen.getByText('Alto Valor ↑')).toBeInTheDocument()
    expect(screen.getByText('Bajo Valor ↓')).toBeInTheDocument()
  })

  it('renders items section heading', () => {
    renderWithProviders(
      <ValueEffortMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Elementos')).toBeInTheDocument()
  })
})
