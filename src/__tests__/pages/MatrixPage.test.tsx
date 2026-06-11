import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import MatrixPage from '../../pages/MatrixPage'
import { LanguageProvider } from '../../i18n/context'

function renderMatrixPage(route: string) {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/matrix/:id" element={<MatrixPage />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>
  )
}

describe('MatrixPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders SWOT matrix for /matrix/swot', () => {
    renderMatrixPage('/matrix/swot')
    expect(screen.getByText('Fortalezas')).toBeInTheDocument()
    expect(screen.getByText('Debilidades')).toBeInTheDocument()
  })

  it('renders BCG matrix for /matrix/bcg', () => {
    renderMatrixPage('/matrix/bcg')
    expect(screen.getByText('Estrellas')).toBeInTheDocument()
    expect(screen.getByText('Productos')).toBeInTheDocument()
  })

  it('renders "not found" for unknown matrix ID', () => {
    renderMatrixPage('/matrix/invalid')
    expect(screen.getByText('Matriz no encontrada')).toBeInTheDocument()
  })

  it('renders home link', () => {
    renderMatrixPage('/matrix/swot')
    expect(screen.getByText('← Inicio')).toBeInTheDocument()
  })

  it('renders edit/lock button', () => {
    renderMatrixPage('/matrix/swot')
    expect(screen.getByText('🔒 Bloquear')).toBeInTheDocument()
  })

  it('renders PDF download button', () => {
    renderMatrixPage('/matrix/swot')
    expect(screen.getByText('Descargar PDF')).toBeInTheDocument()
  })

  it('renders language toggle', () => {
    renderMatrixPage('/matrix/swot')
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('toggles editable mode on lock button click', async () => {
    const user = (await import('@testing-library/user-event')).default.setup()
    renderMatrixPage('/matrix/swot')
    const lockButton = screen.getByText('🔒 Bloquear')
    await user.click(lockButton)
    expect(screen.getByText('✏️ Editar')).toBeInTheDocument()
  })
})
