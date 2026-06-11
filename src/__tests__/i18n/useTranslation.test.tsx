import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { LanguageProvider } from '../../i18n/context'
import { useTranslation } from '../../i18n/useTranslation'
import type { ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

describe('useTranslation', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns Spanish translations by default', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper })
    expect(result.current.lang).toBe('es')
    expect(result.current.t('home.title')).toBe('BMatrix')
  })

  it('returns English translations when lang is en', async () => {
    const { result, rerender } = renderHook(() => useTranslation(), { wrapper })
    result.current.setLang('en')
    rerender()
    await waitFor(() => {
      expect(result.current.lang).toBe('en')
    })
    expect(result.current.t('home.title')).toBe('BMatrix')
    expect(result.current.t('swot.strengths')).toBe('Strengths')
  })

  it('returns Spanish translations for FODA', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper })
    expect(result.current.t('templates.swot.name')).toBe('FODA')
  })

  it('returns the key string for unknown keys', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper })
    expect(result.current.t('nonexistent.key.here')).toBe('nonexistent.key.here')
  })

  it('resolves nested dot-notation keys', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper })
    expect(result.current.t('templates.swot.desc')).toBe('Fortalezas, Debilidades, Oportunidades, Amenazas')
  })
})
