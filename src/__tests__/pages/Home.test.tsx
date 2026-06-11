import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Home from '../../pages/Home'
import { LanguageProvider } from '../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <LanguageProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </LanguageProvider>
  )
}

describe('Home', () => {
  it('renders BMatrix title', () => {
    renderWithProviders(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('BMatrix')
  })

  it('renders subtitle in Spanish', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText(/Matrices de estrategia empresarial/)).toBeInTheDocument()
  })

  it('renders 10 matrix cards', () => {
    renderWithProviders(<Home />)
    const matrixLinks = screen.getAllByRole('link').filter(link =>
      link.getAttribute('href')?.startsWith('/matrix/')
    )
    expect(matrixLinks.length).toBe(10)
  })

  it('renders language toggle', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('renders hero section with CTA button', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText('Explorar Matrices')).toBeInTheDocument()
  })

  it('renders choose section title', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText('Elige una Matrix')).toBeInTheDocument()
  })

  it('renders footer', () => {
    renderWithProviders(<Home />)
    const footer = document.querySelector('footer')
    expect(footer).toBeInTheDocument()
    expect(footer?.textContent).toContain('BMatrix')
  })
})
