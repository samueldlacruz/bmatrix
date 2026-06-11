import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { LanguageProvider, useLanguage } from '../../i18n/context'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'

function TestComponent() {
  const { lang, setLang } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <button onClick={() => setLang('en')}>Switch EN</button>
      <button onClick={() => setLang('es')}>Switch ES</button>
    </div>
  )
}

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = 'es'
  })

  it('defaults to Spanish when localStorage is empty', () => {
    render(<TestComponent />, { wrapper })
    expect(screen.getByTestId('lang')).toHaveTextContent('es')
  })

  it('reads from localStorage on mount', () => {
    localStorage.setItem('bmatrix-lang', 'en')
    render(<TestComponent />, { wrapper })
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
  })

  it('persists language to localStorage', async () => {
    const user = userEvent.setup()
    render(<TestComponent />, { wrapper })
    await user.click(screen.getByText('Switch EN'))
    expect(localStorage.getItem('bmatrix-lang')).toBe('en')
  })

  it('updates document.documentElement.lang', async () => {
    const user = userEvent.setup()
    render(<TestComponent />, { wrapper })
    await user.click(screen.getByText('Switch EN'))
    expect(document.documentElement.lang).toBe('en')
  })
})
