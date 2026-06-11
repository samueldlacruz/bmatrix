import { useState } from 'react';
import type { McKinseyCell } from '../../types/matrix';
import { useTranslation } from '../../i18n/useTranslation';
import { es } from '../../i18n/es';
import { en } from '../../i18n/en';
import { useLanguage } from '../../i18n/context';

interface McKinseyMatrixProps {
  data: McKinseyCell[];
  onChange: (data: McKinseyCell[]) => void;
  editable: boolean;
}

export function getMcKinseyDefault(): McKinseyCell[] {
  return Array.from({ length: 9 }, () => ({ label: '', items: ['', ''] }));
}

export default function McKinseyMatrix({ data, onChange, editable }: McKinseyMatrixProps) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [local, setLocal] = useState<McKinseyCell[]>(data);

  const translations = lang === 'es' ? es : en;
  const allItems: string[] = (translations as Record<string, unknown>).mckinsey
    ? ((translations as Record<string, Record<string, unknown>>).mckinsey.items as string[])
    : [];
  // Distribute flat items array into 9 cells (2 items each)
  const defaultItemsArr: string[][] = Array.from({ length: 9 }, (_, i) => {
    const start = i * 2;
    return allItems.slice(start, start + 2);
  });

  const updateItem = (cellIndex: number, itemIndex: number, value: string) => {
    const updated = [...local];
    const cell = { ...updated[cellIndex], items: [...updated[cellIndex].items] };
    cell.items[itemIndex] = value;
    updated[cellIndex] = cell;
    setLocal(updated);
    onChange(updated);
  };

  const addItem = (cellIndex: number) => {
    const updated = [...local];
    const cell = { ...updated[cellIndex], items: [...updated[cellIndex].items, ''] };
    updated[cellIndex] = cell;
    setLocal(updated);
    onChange(updated);
  };

  const removeItem = (cellIndex: number, itemIndex: number) => {
    const updated = [...local];
    const cell = { ...updated[cellIndex], items: updated[cellIndex].items.filter((_, i) => i !== itemIndex) };
    updated[cellIndex] = cell;
    setLocal(updated);
    onChange(updated);
  };

  const cellColors = [
    'hl-green', 'hl-blue', 'hl-purple',
    'hl-green', 'hl-yellow', 'hl-orange',
    'hl-yellow', 'hl-orange', 'hl-pink',
  ];

  const rowLabels = [t('mckinsey.high'), t('mckinsey.medium'), t('mckinsey.low')];
  const colLabels = [t('mckinsey.high'), t('mckinsey.medium'), t('mckinsey.low')];

  const getCellItems = (cellIndex: number) => {
    const items = local[cellIndex].items;
    const filtered = items.filter(i => i !== '');
    if (filtered.length === 0 && defaultItemsArr[cellIndex]) {
      return defaultItemsArr[cellIndex];
    }
    return items;
  };

  return (
    <div>
      <div className="flex items-center ml-20 mb-1">
        {colLabels.map((label, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="font-hand text-sm text-navy/60">{t('mckinsey.competitiveStrength')} {label}</span>
          </div>
        ))}
      </div>

      <div className="flex">
        <div className="flex flex-col w-20">
          {rowLabels.map((label, i) => (
            <div key={i} className="flex-1 flex items-center justify-center">
              <span className="font-hand text-sm text-navy/60 -rotate-90 whitespace-nowrap">
                {label} {t('mckinsey.attractiveness')}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-0 hand-drawn overflow-hidden">
          {local.map((_cell, cellIndex) => {
            const items = getCellItems(cellIndex);
            return (
              <div key={cellIndex} className={`matrix-cell ${cellColors[cellIndex]}`}>
                <ul className="space-y-1">
                  {items.map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="flex items-start gap-1">
                      <span className="text-navy/30 text-xs mt-0.5">•</span>
                      {editable ? (
                        <div className="flex-1 flex items-center gap-1">
                          <input
                            type="text"
                            value={local[cellIndex].items[itemIndex] ?? ''}
                            onChange={(e) => {
                              if (local[cellIndex].items.length <= itemIndex) {
                                const arr = [...local[cellIndex].items, ...Array(itemIndex - local[cellIndex].items.length + 1).fill('')];
                                arr[itemIndex] = e.target.value;
                                const updated = [...local];
                                updated[cellIndex] = { ...updated[cellIndex], items: arr };
                                setLocal(updated);
                                onChange(updated);
                              } else {
                                updateItem(cellIndex, itemIndex, e.target.value);
                              }
                            }}
                            placeholder={local[cellIndex].items[itemIndex] === '' ? item : ''}
                            className="flex-1 font-hand text-xs"
                          />
                          <button onClick={() => removeItem(cellIndex, itemIndex)} className="text-navy/30 hover:text-red-500 text-xs no-print">×</button>
                        </div>
                      ) : (
                        <span className="font-hand text-xs text-navy">{item}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {editable && (
                  <button onClick={() => addItem(cellIndex)} className="mt-1 text-xs text-mckinsey-blue font-body hover:underline no-print">
                    +
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
