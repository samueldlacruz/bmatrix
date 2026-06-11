import { useState } from 'react';
import type { ValueEffortItem } from '../../types/matrix';
import { useTranslation } from '../../i18n/useTranslation';

interface ValueEffortMatrixProps {
  data: ValueEffortItem[];
  onChange: (data: ValueEffortItem[]) => void;
  editable: boolean;
}

export function getVEDefault(): ValueEffortItem[] {
  return [
    { id: '1', label: '', value: 80, effort: 20 },
    { id: '2', label: '', value: 90, effort: 85 },
    { id: '3', label: '', value: 20, effort: 15 },
    { id: '4', label: '', value: 15, effort: 70 },
  ];
}

export default function ValueEffortMatrix({ data, onChange, editable }: ValueEffortMatrixProps) {
  const { t } = useTranslation();
  const [local, setLocal] = useState<ValueEffortItem[]>(data);

  const defaults = [t('valueEffort.i1'), t('valueEffort.i2'), t('valueEffort.i3'), t('valueEffort.i4')];

  const quadrants = [
    { label: t('valueEffort.quickWins'), desc: t('valueEffort.quickWinsDesc'), colorClass: 'hl-green', pos: 'top-left', emoji: '⚡' },
    { label: t('valueEffort.majorProjects'), desc: t('valueEffort.majorProjectsDesc'), colorClass: 'hl-blue', pos: 'top-right', emoji: '🏗️' },
    { label: t('valueEffort.fillins'), desc: t('valueEffort.fillinsDesc'), colorClass: 'hl-yellow', pos: 'bottom-left', emoji: '📝' },
    { label: t('valueEffort.thankless'), desc: t('valueEffort.thanklessDesc'), colorClass: 'hl-orange', pos: 'bottom-right', emoji: '⏳' },
  ];

  const addItem = () => {
    const newItem: ValueEffortItem = { id: Date.now().toString(), label: t('common.newItem'), value: 50, effort: 50 };
    const updated = [...local, newItem];
    setLocal(updated);
    onChange(updated);
  };

  const updateItem = (id: string, field: keyof ValueEffortItem, value: string | number) => {
    const updated = local.map((item) => item.id === id ? { ...item, [field]: value } : item);
    setLocal(updated);
    onChange(updated);
  };

  const removeItem = (id: string) => {
    const updated = local.filter((item) => item.id !== id);
    setLocal(updated);
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-32 mb-2">
        <span className="font-hand text-sm text-navy/60">{t('valueEffort.lowEffort')}</span>
        <span className="font-hand text-sm text-navy/60">{t('valueEffort.highEffort')}</span>
      </div>

      <div className="flex">
        <div className="flex flex-col justify-center items-center w-16 gap-4">
          <span className="font-hand text-sm text-navy/60 -rotate-90 whitespace-nowrap">{t('valueEffort.highValue')}</span>
          <span className="font-hand text-sm text-navy/60 -rotate-90 whitespace-nowrap">{t('valueEffort.lowValue')}</span>
        </div>

        <div className="flex-1 relative hand-drawn overflow-hidden" style={{ minHeight: '400px' }}>
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            {quadrants.map(({ label, desc, colorClass, pos, emoji }) => (
              <div key={pos} className={`matrix-cell ${colorClass}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{emoji}</span>
                  <h4 className="font-hand text-lg font-bold text-navy">{label}</h4>
                </div>
                <p className="text-xs text-navy/50 font-body">{desc}</p>
              </div>
            ))}
          </div>

          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            {local.map((item, i) => {
              const x = (item.effort / 100) * 90 + 5;
              const y = (100 - item.value) / 100 * 90 + 5;
              const label = item.label || defaults[i] || '';
              return (
                <g key={item.id}>
                  <circle cx={`${x}%`} cy={`${y}%`} r="20" fill="rgba(5, 28, 44, 0.15)" stroke="#051C2C" strokeWidth="1.5" />
                  <text x={`${x}%`} y={`${y}%`} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '10px', fontFamily: 'Caveat', fill: '#051C2C' }}>
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="mt-4 hand-drawn p-4">
        <h4 className="font-hand text-lg font-bold text-navy mb-3">{t('valueEffort.items')}</h4>
        <div className="space-y-2">
          {local.map((item, i) => (
            <div key={item.id} className="flex items-center gap-3 text-sm">
              {editable ? (
                <>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                    placeholder={item.label === '' ? defaults[i] : ''}
                    className="flex-1 font-hand"
                  />
                  <span className="text-navy/50 font-body text-xs w-12">{t('valueEffort.value')}</span>
                  <input type="number" value={item.value} onChange={(e) => updateItem(item.id, 'value', Number(e.target.value))} className="w-16 text-center" min={0} max={100} />
                  <span className="text-navy/50 font-body text-xs w-14">{t('valueEffort.effort')}</span>
                  <input type="number" value={item.effort} onChange={(e) => updateItem(item.id, 'effort', Number(e.target.value))} className="w-16 text-center" min={0} max={100} />
                  <button onClick={() => removeItem(item.id)} className="text-navy/30 hover:text-red-500 text-xs no-print">×</button>
                </>
              ) : (
                <span className="font-hand text-base">
                  {item.label || defaults[i]} — {t('valueEffort.value')} {item.value}, {t('valueEffort.effort')} {item.effort}
                </span>
              )}
            </div>
          ))}
        </div>
        {editable && (
          <button onClick={addItem} className="mt-3 text-xs text-mckinsey-blue font-body hover:underline no-print">
            {t('common.addItem')}
          </button>
        )}
      </div>
    </div>
  );
}
