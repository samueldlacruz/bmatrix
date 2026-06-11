import { describe, it, expect } from 'vitest'
import { matrixIds, matrixColors, getMatrixConfig } from '../../data/templates'

describe('templates', () => {
  it('matrixIds contains exactly 10 IDs', () => {
    expect(matrixIds).toHaveLength(10)
  })

  it('matrixColors has entries for all 10 matrix IDs', () => {
    for (const id of matrixIds) {
      expect(matrixColors[id]).toBeDefined()
      expect(matrixColors[id].color).toMatch(/^#[0-9A-F]{6}$/i)
      expect(matrixColors[id].colorClass).toBeTruthy()
      expect(matrixColors[id].icon).toBeTruthy()
    }
  })

  it('getMatrixConfig returns correct structure', () => {
    const config = getMatrixConfig('swot', 'FODA', 'Fortalezas, Debilidades, Oportunidades, Amenazas')
    expect(config).toEqual({
      id: 'swot',
      name: 'FODA',
      description: 'Fortalezas, Debilidades, Oportunidades, Amenazas',
      icon: 'S',
      color: '#FFF200',
      colorClass: 'hl-yellow',
    })
  })

  it('getMatrixConfig works for all matrix IDs', () => {
    for (const id of matrixIds) {
      const config = getMatrixConfig(id, `Test ${id}`, `Description ${id}`)
      expect(config).not.toBeNull()
      expect(config!.id).toBe(id)
      expect(config!.name).toBe(`Test ${id}`)
      expect(config!.icon).toBeTruthy()
    }
  })
})
