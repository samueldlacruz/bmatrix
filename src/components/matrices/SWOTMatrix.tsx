import { useState } from 'react';
import type { SWOTData } from '../../types/matrix';
import { useTranslation } from '../../i18n/useTranslation';

interface SWOTMatrixProps {
  data: SWOTData;
  onChange: (data: SWOTData) => void;
  editable: boolean;
}

export function getSWOTDefault(): SWOTData {
  return {
    strengths: ['', ''],
    weaknesses: ['', ''],
    opportunities: ['', ''],
    threats: ['', ''],
  };
}

export default function SWOTMatrix({ data, onChange, editable }: SWOTMatrixProps) {
  const { t } = useTranslation();
  const [local, setLocal] = useState<SWOTData>(data);

  const update = (key: keyof SWOTData, index: number, value: string) => {
    const updated = { ...local };
    const arr = [...updated[key]];
    arr[index] = value;
    updated[key] = arr;
    setLocal(updated);
    onChange(updated);
  };

  const addItem = (key: keyof SWOTData) => {
    const updated = { ...local, [key]: [...local[key], ''] };
    setLocal(updated);
    onChange(updated);
  };

  const removeItem = (key: keyof SWOTData, index: number) => {
    const updated = { ...local, [key]: local[key].filter((_, i) => i !== index) };
    setLocal(updated);
    onChange(updated);
  };

  const quadrants = [
    { key: 'strengths' as const, label: t('swot.strengths'), colorClass: 'hl-green', emoji: '💪' },
    { key: 'weaknesses' as const, label: t('swot.weaknesses'), colorClass: 'hl-pink', emoji: '⚠️' },
    { key: 'opportunities' as const, label: t('swot.opportunities'), colorClass: 'hl-blue', emoji: '🚀' },
    { key: 'threats' as const, label: t('swot.threats'), colorClass: 'hl-orange', emoji: '🔥' },
  ];

  const defaults = {
    strengths: [t('swot.s1'), t('swot.s2')],
    weaknesses: [t('swot.w1'), t('swot.w2')],
    opportunities: [t('swot.o1'), t('swot.o2')],
    threats: [t('swot.t1'), t('swot.t2')],
  };

  const getItems = (key: keyof SWOTData) => {
    const items = local[key];
    if (items.length === 0 && defaults[key]) return defaults[key];
    return items;
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-0 hand-drawn overflow-hidden">
        {quadrants.map(({ key, label, colorClass, emoji }) => (
          <div key={key} className={`matrix-cell ${colorClass}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{emoji}</span>
              <h4 className="font-hand text-xl font-bold text-navy">{label}</h4>
            </div>
            <ul className="space-y-2">
              {getItems(key).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-navy/30 mt-1 text-sm">•</span>
                  {editable ? (
                    <div className="flex-1 flex items-center gap-1">
                      <input
                        type="text"
                        value={local[key][i] ?? ''}
                        onChange={(e) => {
                          if (local[key].length <= i) {
                            const arr = [...local[key], ...Array(i - local[key].length + 1).fill('')];
                            arr[i] = e.target.value;
                            const updated = { ...local, [key]: arr };
                            setLocal(updated);
                            onChange(updated);
                          } else {
                            update(key, i, e.target.value);
                          }
                        }}
                        placeholder={local[key][i] === '' ? item : ''}
                        className="flex-1 font-hand text-base"
                      />
                      <button
                        onClick={() => removeItem(key, i)}
                        className="text-navy/30 hover:text-red-500 text-xs no-print"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <span className="font-hand text-base text-navy">{item}</span>
                  )}
                </li>
              ))}
            </ul>
            {editable && (
              <button
                onClick={() => addItem(key)}
                className="mt-2 text-xs text-mckinsey-blue font-body hover:underline no-print"
              >
                {t('common.add')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
