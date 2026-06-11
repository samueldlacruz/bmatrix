import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BCGMatrix, { getBCGDefault } from '../../../components/matrices/BCGMatrix'
import { LanguageProvider } from '../../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('BCGMatrix', () => {
  const defaultData = getBCGDefault()

  it('renders 4 quadrant labels', () => {
    renderWithProviders(
      <BCGMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Estrellas')).toBeInTheDocument()
    expect(screen.getByText('Interrogantes')).toBeInTheDocument()
    expect(screen.getByText('Vacas Lecheras')).toBeInTheDocument()
    expect(screen.getByText('Perros')).toBeInTheDocument()
  })

  it('renders axis labels', () => {
    renderWithProviders(
      <BCGMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText(/Crecimiento del Mercado/)).toBeInTheDocument()
    expect(screen.getByText(/Participación Relativa/)).toBeInTheDocument()
  })

  it('renders products section heading', () => {
    renderWithProviders(
      <BCGMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Productos')).toBeInTheDocument()
  })

  it('renders product inputs in editable mode', () => {
    renderWithProviders(
      <BCGMatrix data={defaultData} onChange={() => {}} editable={true} />
    )
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('renders Add Product button in editable mode', () => {
    renderWithProviders(
      <BCGMatrix data={defaultData} onChange={() => {}} editable={true} />
    )
    expect(screen.getByText('+ Agregar Producto')).toBeInTheDocument()
  })
})
