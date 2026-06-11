import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RACIMatrix, { getRACIDefault } from '../../../components/matrices/RACIMatrix'
import { LanguageProvider } from '../../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('RACIMatrix', () => {
  const defaultData = getRACIDefault()

  it('renders RACI legend', () => {
    renderWithProviders(
      <RACIMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    const legendItems = screen.getAllByText('Responsable')
    expect(legendItems.length).toBe(2) // responsible + accountable
    expect(screen.getByText('Consultado')).toBeInTheDocument()
    expect(screen.getByText('Informado')).toBeInTheDocument()
  })

  it('renders table with Task header', () => {
    renderWithProviders(
      <RACIMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Tarea')).toBeInTheDocument()
  })

  it('renders select dropdowns in editable mode', () => {
    renderWithProviders(
      <RACIMatrix data={defaultData} onChange={() => {}} editable={true} />
    )
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThan(0)
  })

  it('renders Add Task and Add Role buttons in editable mode', () => {
    renderWithProviders(
      <RACIMatrix data={defaultData} onChange={() => {}} editable={true} />
    )
    expect(screen.getByText('+ Agregar Tarea')).toBeInTheDocument()
    expect(screen.getByText('+ Agregar Rol')).toBeInTheDocument()
  })

  it('renders role column headers', () => {
    renderWithProviders(
      <RACIMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Gerente de Proyecto')).toBeInTheDocument()
    expect(screen.getByText('Desarrollador')).toBeInTheDocument()
    expect(screen.getByText('Diseñador')).toBeInTheDocument()
    expect(screen.getByText('Parte Interesada')).toBeInTheDocument()
  })
})
