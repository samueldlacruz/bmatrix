import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AnsoffMatrix, { getAnsoffDefault } from '../../../components/matrices/AnsoffMatrix'
import { LanguageProvider } from '../../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('AnsoffMatrix', () => {
  const defaultData = getAnsoffDefault()

  it('renders 4 quadrant labels', () => {
    renderWithProviders(
      <AnsoffMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Penetración de Mercado')).toBeInTheDocument()
    expect(screen.getByText('Desarrollo de Producto')).toBeInTheDocument()
    expect(screen.getByText('Desarrollo de Mercado')).toBeInTheDocument()
    expect(screen.getByText('Diversificación')).toBeInTheDocument()
  })

  it('renders axis labels', () => {
    renderWithProviders(
      <AnsoffMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Productos Existentes')).toBeInTheDocument()
    expect(screen.getByText('Nuevos Productos')).toBeInTheDocument()
    expect(screen.getByText('Mercados Existentes')).toBeInTheDocument()
    expect(screen.getByText('Nuevos Mercados')).toBeInTheDocument()
  })
})
