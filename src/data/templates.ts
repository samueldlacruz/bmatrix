import type { MatrixConfig, MatrixId } from '../types/matrix';

export const matrixIds: MatrixId[] = [
  'swot', 'bcg', 'ansoff', 'mckinsey',
  'eisenhower', 'raci', 'risk', 'value-effort',
  'how-might-we', 'empathy-map',
];

export const matrixColors: Record<MatrixId, { color: string; colorClass: string; icon: string }> = {
  swot:            { color: '#FFF200', colorClass: 'hl-yellow',  icon: 'S' },
  bcg:             { color: '#FF9933', colorClass: 'hl-orange',  icon: 'B' },
  ansoff:          { color: '#7CFC00', colorClass: 'hl-green',   icon: 'A' },
  mckinsey:        { color: '#D580FF', colorClass: 'hl-purple',  icon: 'M' },
  eisenhower:      { color: '#FF6EC7', colorClass: 'hl-pink',    icon: 'E' },
  raci:            { color: '#00D4FF', colorClass: 'hl-blue',    icon: 'R' },
  risk:            { color: '#FF6EC7', colorClass: 'hl-pink',    icon: '!' },
  'value-effort':  { color: '#7CFC00', colorClass: 'hl-green',   icon: 'V' },
  'how-might-we':  { color: '#FFD700', colorClass: 'hl-yellow',  icon: '?' },
  'empathy-map':   { color: '#FF6EC7', colorClass: 'hl-pink',    icon: '♥' },
};

export function getMatrixConfig(id: MatrixId, name: string, description: string): MatrixConfig | null {
  const c = matrixColors[id];
  if (!c) {
    return null;
  }
  return { id, name, description, icon: c.icon, color: c.color, colorClass: c.colorClass };
}
