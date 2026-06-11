import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EmpathyMapMatrix, { getEmpathyMapDefault } from '../../../components/matrices/EmpathyMapMatrix'
import { LanguageProvider } from '../../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('EmpathyMapMatrix', () => {
  const defaultData = getEmpathyMapDefault()

  it('renders 4 section labels', () => {
    renderWithProviders(
      <EmpathyMapMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Dice')).toBeInTheDocument()
    expect(screen.getByText('Piensa')).toBeInTheDocument()
    expect(screen.getByText('Hace')).toBeInTheDocument()
    expect(screen.getByText('Siente')).toBeInTheDocument()
  })

  it('renders section emojis', () => {
    renderWithProviders(
      <EmpathyMapMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('💬')).toBeInTheDocument()
    expect(screen.getByText('🧠')).toBeInTheDocument()
    expect(screen.getByText('🏃')).toBeInTheDocument()
    expect(screen.getByText('❤️')).toBeInTheDocument()
  })

  it('renders 2×2 grid', () => {
    renderWithProviders(
      <EmpathyMapMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    const cells = document.querySelectorAll('.matrix-cell')
    expect(cells.length).toBe(4)
  })

  it('renders default items when data is empty', () => {
    renderWithProviders(
      <EmpathyMapMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText(/Necesito terminar/)).toBeInTheDocument()
    expect(screen.getByText(/Frustrado/)).toBeInTheDocument()
  })

  it('renders editable inputs when editable is true', () => {
    renderWithProviders(
      <EmpathyMapMatrix data={defaultData} onChange={() => {}} editable={true} />
    )
    const inputs = document.querySelectorAll('input[type="text"]')
    expect(inputs.length).toBeGreaterThan(0)
  })
})
