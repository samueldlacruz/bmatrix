import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EisenhowerMatrix, { getEisenhowerDefault } from '../../../components/matrices/EisenhowerMatrix'
import { LanguageProvider } from '../../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('EisenhowerMatrix', () => {
  const defaultData = getEisenhowerDefault()

  it('renders 4 quadrant labels', () => {
    renderWithProviders(
      <EisenhowerMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Hacer Primero')).toBeInTheDocument()
    expect(screen.getByText('Programar')).toBeInTheDocument()
    expect(screen.getByText('Delegar')).toBeInTheDocument()
    expect(screen.getByText('Eliminar')).toBeInTheDocument()
  })

  it('renders axis labels', () => {
    renderWithProviders(
      <EisenhowerMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('← Urgente')).toBeInTheDocument()
    expect(screen.getByText('No Urgente →')).toBeInTheDocument()
    expect(screen.getByText('Importante ↑')).toBeInTheDocument()
    expect(screen.getByText('No Importante ↓')).toBeInTheDocument()
  })

  it('renders quadrant subtitles', () => {
    renderWithProviders(
      <EisenhowerMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Urgente + Importante')).toBeInTheDocument()
    expect(screen.getByText('No Urgente + Importante')).toBeInTheDocument()
    expect(screen.getByText('Urgente + No Importante')).toBeInTheDocument()
    expect(screen.getByText('No Urgente + No Importante')).toBeInTheDocument()
  })
})
