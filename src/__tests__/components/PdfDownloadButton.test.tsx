import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PdfDownloadButton from '../../components/PdfDownloadButton'

describe('PdfDownloadButton', () => {
  it('renders with provided label', () => {
    render(<PdfDownloadButton onClick={() => {}} label="Descargar PDF" />)
    expect(screen.getByText('Descargar PDF')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = (await import('@testing-library/user-event')).default.setup()
    const handleClick = vi.fn()
    render(<PdfDownloadButton onClick={handleClick} label="Download" />)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders download icon SVG', () => {
    render(<PdfDownloadButton onClick={() => {}} label="Download" />)
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
  })
})
