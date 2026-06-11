import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import SWOTMatrix, { getSWOTDefault } from '../../../components/matrices/SWOTMatrix'
import { LanguageProvider } from '../../../i18n/context'

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('SWOTMatrix', () => {
  const defaultData = getSWOTDefault()

  it('renders 4 quadrants with labels', () => {
    renderWithProviders(
      <SWOTMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    expect(screen.getByText('Fortalezas')).toBeInTheDocument()
    expect(screen.getByText('Debilidades')).toBeInTheDocument()
    expect(screen.getByText('Oportunidades')).toBeInTheDocument()
    expect(screen.getByText('Amenazas')).toBeInTheDocument()
  })

  it('renders inputs in editable mode', () => {
    renderWithProviders(
      <SWOTMatrix data={defaultData} onChange={() => {}} editable={true} />
    )
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('does not render inputs in read-only mode', () => {
    renderWithProviders(
      <SWOTMatrix data={defaultData} onChange={() => {}} editable={false} />
    )
    const inputs = screen.queryAllByRole('textbox')
    expect(inputs.length).toBe(0)
  })

  it('calls onChange when typing in input', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    renderWithProviders(
      <SWOTMatrix data={defaultData} onChange={handleChange} editable={true} />
    )
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'Test')
    expect(handleChange).toHaveBeenCalled()
  })

  it('adds new item when clicking Add button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    renderWithProviders(
      <SWOTMatrix data={defaultData} onChange={handleChange} editable={true} />
    )
    const addButtons = screen.getAllByText('+ Agregar')
    await user.click(addButtons[0])
    expect(handleChange).toHaveBeenCalled()
  })
})
