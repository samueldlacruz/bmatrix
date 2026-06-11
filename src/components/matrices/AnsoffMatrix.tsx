import { useState } from 'react';
import type { AnsoffData } from '../../types/matrix';
import { useTranslation } from '../../i18n/useTranslation';

interface AnsoffMatrixProps {
  data: AnsoffData;
  onChange: (data: AnsoffData) => void;
  editable: boolean;
}

export function getAnsoffDefault(): AnsoffData {
  return {
    marketPenetration: ['', '', ''],
    productDevelopment: ['', '', ''],
    marketDevelopment: ['', '', ''],
    diversification: ['', '', ''],
  };
}

export default function AnsoffMatrix({ data, onChange, editable }: AnsoffMatrixProps) {
  const { t } = useTranslation();
  const [local, setLocal] = useState<AnsoffData>(data);

  const defaults = {
    marketPenetration: [t('ansoff.s1'), t('ansoff.s2'), t('ansoff.s3')],
    productDevelopment: [t('ansoff.s4'), t('ansoff.s5'), t('ansoff.s6')],
    marketDevelopment: [t('ansoff.s7'), t('ansoff.s8'), t('ansoff.s9')],
    diversification: [t('ansoff.s10'), t('ansoff.s11'), t('ansoff.s12')],
  };

  const update = (key: keyof AnsoffData, index: number, value: string) => {
    const updated = { ...local };
    const arr = [...updated[key]];
    arr[index] = value;
    updated[key] = arr;
    setLocal(updated);
    onChange(updated);
  };

  const addItem = (key: keyof AnsoffData) => {
    const updated = { ...local, [key]: [...local[key], ''] };
    setLocal(updated);
    onChange(updated);
  };

  const removeItem = (key: keyof AnsoffData, index: number) => {
    const updated = { ...local, [key]: local[key].filter((_, i) => i !== index) };
    setLocal(updated);
    onChange(updated);
  };

  const quadrants = [
    { key: 'marketPenetration' as const, label: t('ansoff.marketPenetration'), sub: t('ansoff.marketPenSub'), colorClass: 'hl-green', emoji: '📈' },
    { key: 'productDevelopment' as const, label: t('ansoff.productDev'), sub: t('ansoff.productDevSub'), colorClass: 'hl-blue', emoji: '🔬' },
    { key: 'marketDevelopment' as const, label: t('ansoff.marketDev'), sub: t('ansoff.marketDevSub'), colorClass: 'hl-orange', emoji: '🌍' },
    { key: 'diversification' as const, label: t('ansoff.diversification'), sub: t('ansoff.diversificationSub'), colorClass: 'hl-purple', emoji: '🎲' },
  ];

  const getItems = (key: keyof AnsoffData) => {
    const items = local[key];
    if (items.length === 0) return defaults[key];
    return items;
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-8 mb-2 ml-16">
        <span className="font-hand text-sm text-navy/60">{t('ansoff.existingProducts')}</span>
        <span className="font-hand text-sm text-navy/60">{t('ansoff.newProducts')}</span>
      </div>

      <div className="flex">
        <div className="flex flex-col justify-center items-center w-16 gap-4">
          <span className="font-hand text-sm text-navy/60 -rotate-90 whitespace-nowrap">{t('ansoff.existingMarkets')}</span>
          <span className="font-hand text-sm text-navy/60 -rotate-90 whitespace-nowrap">{t('ansoff.newMarkets')}</span>
        </div>

        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-0 hand-drawn overflow-hidden">
          {quadrants.map(({ key, label, sub, colorClass, emoji }) => (
            <div key={key} className={`matrix-cell ${colorClass}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{emoji}</span>
                <h4 className="font-hand text-lg font-bold text-navy">{label}</h4>
              </div>
              <p className="text-xs text-navy/50 font-body mb-3">{sub}</p>
              <ul className="space-y-1">
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
                          className="flex-1 font-hand text-sm"
                        />
                        <button onClick={() => removeItem(key, i)} className="text-navy/30 hover:text-red-500 text-xs no-print">×</button>
                      </div>
                    ) : (
                      <span className="font-hand text-sm text-navy">{item}</span>
                    )}
                  </li>
                ))}
              </ul>
              {editable && (
                <button onClick={() => addItem(key)} className="mt-2 text-xs text-mckinsey-blue font-body hover:underline no-print">
                  {t('common.add')}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
