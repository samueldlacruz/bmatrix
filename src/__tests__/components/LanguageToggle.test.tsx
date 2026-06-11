import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import LanguageToggle from '../../components/LanguageToggle'
import { LanguageProvider } from '../../i18n/context'

function renderWithProvider(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('LanguageToggle', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders ES and EN labels', () => {
    renderWithProvider(<LanguageToggle />)
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('highlights ES when language is Spanish', () => {
    renderWithProvider(<LanguageToggle />)
    const esSpan = screen.getByText('ES')
    expect(esSpan).toHaveClass('bg-navy')
    expect(esSpan).toHaveClass('text-white')
  })

  it('toggles language on click', async () => {
    const user = userEvent.setup()
    renderWithProvider(<LanguageToggle />)
    const button = screen.getByRole('button')
    await user.click(button)
    const enSpan = screen.getByText('EN')
    expect(enSpan).toHaveClass('bg-navy')
    expect(enSpan).toHaveClass('text-white')
  })
})
