import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import MatrixCard from '../../components/MatrixCard'
import { LanguageProvider } from '../../i18n/context'
import type { MatrixConfig } from '../../types/matrix'

const mockMatrix: MatrixConfig = {
  id: 'swot',
  name: 'FODA',
  description: 'Fortalezas, Debilidades, Oportunidades, Amenazas',
  icon: 'S',
  color: '#FFF200',
  colorClass: 'hl-yellow',
}

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <LanguageProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </LanguageProvider>
  )
}

describe('MatrixCard', () => {
  it('renders matrix name and description', () => {
    renderWithProviders(<MatrixCard matrix={mockMatrix} openLabel="Abrir →" />)
    expect(screen.getByText('FODA')).toBeInTheDocument()
    expect(screen.getByText('Fortalezas, Debilidades, Oportunidades, Amenazas')).toBeInTheDocument()
  })

  it('renders openLabel', () => {
    renderWithProviders(<MatrixCard matrix={mockMatrix} openLabel="Abrir →" />)
    expect(screen.getByText('Abrir →')).toBeInTheDocument()
  })

  it('renders icon character', () => {
    renderWithProviders(<MatrixCard matrix={mockMatrix} openLabel="Abrir →" />)
    expect(screen.getByText('S')).toBeInTheDocument()
  })

  it('links to correct matrix page', () => {
    renderWithProviders(<MatrixCard matrix={mockMatrix} openLabel="Abrir →" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/matrix/swot')
  })

  it('applies colorClass to icon container', () => {
    renderWithProviders(<MatrixCard matrix={mockMatrix} openLabel="Abrir →" />)
    const iconContainer = document.querySelector('.hl-yellow')
    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveClass('hl-yellow')
  })

  it('applies large size classes', () => {
    renderWithProviders(<MatrixCard matrix={mockMatrix} openLabel="Abrir →" size="large" />)
    const link = screen.getByRole('link')
    expect(link.className).toMatch(/col-span-1 sm:col-span-2/)
    expect(link.className).toMatch(/row-span-2/)
  })

  it('applies medium size classes', () => {
    renderWithProviders(<MatrixCard matrix={mockMatrix} openLabel="Abrir →" size="medium" />)
    const link = screen.getByRole('link')
    expect(link.className).toMatch(/col-span-1 sm:col-span-2/)
    expect(link.className).toMatch(/row-span-1/)
  })

  it('applies small size classes by default', () => {
    renderWithProviders(<MatrixCard matrix={mockMatrix} openLabel="Abrir →" />)
    const link = screen.getByRole('link')
    expect(link.className).toMatch(/col-span-1/)
    expect(link.className).not.toMatch(/row-span-2/)
  })
})
