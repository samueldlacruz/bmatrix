import type { MatrixId } from '../types/matrix';

export type BentoSize = 'large' | 'medium' | 'small';

export interface BentoCell {
  id: MatrixId;
  size: BentoSize;
}

const layouts: BentoCell[][] = [
  // Layout 1: SWOT grande, Eisenhower + Risk medianos, EM mediano
  [
    { id: 'swot', size: 'large' },
    { id: 'eisenhower', size: 'medium' },
    { id: 'risk', size: 'medium' },
    { id: 'empathy-map', size: 'medium' },
    { id: 'bcg', size: 'small' },
    { id: 'ansoff', size: 'small' },
    { id: 'mckinsey', size: 'small' },
    { id: 'raci', size: 'small' },
    { id: 'how-might-we', size: 'small' },
    { id: 'value-effort', size: 'small' },
  ],
  // Layout 2: Risk grande, SWOT + EM medianos, Eisenhower mediano
  [
    { id: 'risk', size: 'large' },
    { id: 'swot', size: 'medium' },
    { id: 'empathy-map', size: 'medium' },
    { id: 'eisenhower', size: 'medium' },
    { id: 'bcg', size: 'small' },
    { id: 'ansoff', size: 'small' },
    { id: 'mckinsey', size: 'small' },
    { id: 'raci', size: 'small' },
    { id: 'how-might-we', size: 'small' },
    { id: 'value-effort', size: 'small' },
  ],
  // Layout 3: EM grande, Risk + Eisenhower medianos, SWOT mediano
  [
    { id: 'empathy-map', size: 'large' },
    { id: 'risk', size: 'medium' },
    { id: 'eisenhower', size: 'medium' },
    { id: 'swot', size: 'medium' },
    { id: 'bcg', size: 'small' },
    { id: 'ansoff', size: 'small' },
    { id: 'mckinsey', size: 'small' },
    { id: 'raci', size: 'small' },
    { id: 'how-might-we', size: 'small' },
    { id: 'value-effort', size: 'small' },
  ],
  // Layout 4: Eisenhower grande, SWOT + EM medianos, Risk mediano
  [
    { id: 'eisenhower', size: 'large' },
    { id: 'swot', size: 'medium' },
    { id: 'empathy-map', size: 'medium' },
    { id: 'risk', size: 'medium' },
    { id: 'bcg', size: 'small' },
    { id: 'ansoff', size: 'small' },
    { id: 'mckinsey', size: 'small' },
    { id: 'raci', size: 'small' },
    { id: 'how-might-we', size: 'small' },
    { id: 'value-effort', size: 'small' },
  ],
];

export function getRandomLayout(): BentoCell[] {
  const idx = Math.floor(Math.random() * layouts.length);
  return layouts[idx];
}

export function getBentoClasses(size: BentoSize): string {
  switch (size) {
    case 'large':
      return 'col-span-1 sm:col-span-2 row-span-2';
    case 'medium':
      return 'col-span-1 sm:col-span-2 row-span-1';
    case 'small':
      return 'col-span-1 row-span-1';
  }
}
