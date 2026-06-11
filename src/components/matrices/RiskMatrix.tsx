import { useState } from 'react';
import type { RiskItem } from '../../types/matrix';
import { useTranslation } from '../../i18n/useTranslation';

interface RiskMatrixProps {
  data: RiskItem[];
  onChange: (data: RiskItem[]) => void;
  editable: boolean;
}

export function getRiskDefault(): RiskItem[] {
  return [
    { id: '1', label: '', likelihood: 4, impact: 5 },
    { id: '2', label: '', likelihood: 2, impact: 5 },
    { id: '3', label: '', likelihood: 3, impact: 3 },
    { id: '4', label: '', likelihood: 4, impact: 3 },
  ];
}

export default function RiskMatrix({ data, onChange, editable }: RiskMatrixProps) {
  const { t } = useTranslation();
  const [local, setLocal] = useState<RiskItem[]>(data);

  const defaults = [t('risk.r1'), t('risk.r2'), t('risk.r3'), t('risk.r4')];

  const addItem = (likelihood: number, impact: number) => {
    const newItem: RiskItem = { id: Date.now().toString(), label: t('common.newRisk'), likelihood, impact };
    const updated = [...local, newItem];
    setLocal(updated);
    onChange(updated);
  };

  const updateItem = (id: string, field: keyof RiskItem, value: string | number) => {
    const updated = local.map((item) => item.id === id ? { ...item, [field]: value } : item);
    setLocal(updated);
    onChange(updated);
  };

  const removeItem = (id: string) => {
    const updated = local.filter((item) => item.id !== id);
    setLocal(updated);
    onChange(updated);
  };

  const getRiskColor = (likelihood: number, impact: number): string => {
    const score = likelihood * impact;
    if (score >= 15) return 'bg-red-400/40';
    if (score >= 10) return 'bg-orange-300/40';
    if (score >= 5) return 'bg-yellow-200/40';
    return 'bg-green-200/30';
  };

  const getItemsForCell = (likelihood: number, impact: number) =>
    local.filter((item) => item.likelihood === likelihood && item.impact === impact);

  const likelihoodLabels = [t('risk.rare'), t('risk.unlikely'), t('risk.possible'), t('risk.likely'), t('risk.almostCertain')];
  const impactLabels = [t('risk.negligible'), t('risk.minor'), t('risk.moderate'), t('risk.major'), t('risk.catastrophic')];

  return (
    <div>
      <div className="flex items-center mb-2 ml-20">
        <span className="font-hand text-sm text-navy/60 flex-1 text-center">{t('risk.impact')}</span>
      </div>

      <div className="flex">
        <div className="flex flex-col w-20">
          {likelihoodLabels.map((label, i) => (
            <div key={i} className="flex-1 flex items-center justify-end pr-2">
              <span className="font-hand text-xs text-navy/60 text-right leading-tight">{label}</span>
            </div>
          ))}
          <div className="h-6 flex items-center justify-center">
            <span className="font-hand text-xs text-navy/60 -rotate-90 whitespace-nowrap">{t('risk.likelihood')}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-5 gap-0 mb-1">
            {impactLabels.map((label, i) => (
              <div key={i} className="text-center">
                <span className="font-hand text-xs text-navy/60">{label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 grid-rows-5 gap-0 hand-drawn overflow-hidden">
            {Array.from({ length: 5 }, (_, row) =>
              Array.from({ length: 5 }, (_, col) => {
                const likelihood = 5 - row;
                const impact = col + 1;
                const items = getItemsForCell(likelihood, impact);
                return (
                  <div key={`${row}-${col}`} className={`matrix-cell ${getRiskColor(likelihood, impact)} min-h-[70px] relative`}>
                    {items.map((item) => (
                      <div key={item.id} className="mb-1">
                        {editable ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                              placeholder={item.label === '' ? defaults[local.indexOf(item)] || '' : ''}
                              className="font-hand text-xs w-full"
                            />
                            <button onClick={() => removeItem(item.id)} className="text-navy/30 hover:text-red-500 text-xs no-print shrink-0">×</button>
                          </div>
                        ) : (
                          <span className="font-hand text-xs text-navy block truncate" title={item.label}>
                            {item.label || defaults[local.indexOf(item)] || ''}
                          </span>
                        )}
                      </div>
                    ))}
                    {editable && items.length === 0 && (
                      <button onClick={() => addItem(likelihood, impact)} className="absolute inset-0 w-full h-full text-navy/10 hover:text-navy/30 text-lg no-print">
                        +
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 hand-drawn p-4">
        <h4 className="font-hand text-lg font-bold text-navy mb-2">{t('risk.legend')}</h4>
        <div className="flex gap-4 flex-wrap text-xs font-body">
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-red-400/40 rounded-sm"></span> {t('risk.critical')}</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-orange-300/40 rounded-sm"></span> {t('risk.high')}</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-yellow-200/40 rounded-sm"></span> {t('risk.medium')}</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-green-200/30 rounded-sm"></span> {t('risk.low')}</div>
        </div>
      </div>
    </div>
  );
}
