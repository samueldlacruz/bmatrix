import { useState } from 'react';
import type { BCGItem } from '../../types/matrix';
import { useTranslation } from '../../i18n/useTranslation';

interface BCGMatrixProps {
  data: BCGItem[];
  onChange: (data: BCGItem[]) => void;
  editable: boolean;
}

export function getBCGDefault(): BCGItem[] {
  return [
    { id: '1', name: '', revenue: 80, growth: 75, marketShare: 80 },
    { id: '2', name: '', revenue: 40, growth: 80, marketShare: 30 },
    { id: '3', name: '', revenue: 60, growth: 20, marketShare: 70 },
    { id: '4', name: '', revenue: 30, growth: 25, marketShare: 25 },
  ];
}

export default function BCGMatrix({ data, onChange, editable }: BCGMatrixProps) {
  const { t } = useTranslation();
  const [local, setLocal] = useState<BCGItem[]>(data);

  const defaults = [t('bcg.p1'), t('bcg.p2'), t('bcg.p3'), t('bcg.p4')];

  const updateItem = (id: string, field: keyof BCGItem, value: string | number) => {
    const updated = local.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setLocal(updated);
    onChange(updated);
  };

  const addItem = () => {
    const newItem: BCGItem = {
      id: Date.now().toString(),
      name: t('common.newProduct'),
      revenue: 50,
      growth: 50,
      marketShare: 50,
    };
    const updated = [...local, newItem];
    setLocal(updated);
    onChange(updated);
  };

  const removeItem = (id: string) => {
    const updated = local.filter((item) => item.id !== id);
    setLocal(updated);
    onChange(updated);
  };

  const quadrants = [
    { label: t('bcg.stars'), desc: t('bcg.starsDesc'), colorClass: 'hl-yellow', pos: 'top-left' },
    { label: t('bcg.questions'), desc: t('bcg.questionsDesc'), colorClass: 'hl-purple', pos: 'top-right' },
    { label: t('bcg.cows'), desc: t('bcg.cowsDesc'), colorClass: 'hl-green', pos: 'bottom-left' },
    { label: t('bcg.dogs'), desc: t('bcg.dogsDesc'), colorClass: 'hl-orange', pos: 'bottom-right' },
  ];

  return (
    <div>
      <div className="relative hand-drawn overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-center justify-center z-10">
          <span className="font-hand text-sm text-navy/60 -rotate-90 whitespace-nowrap">{t('bcg.marketGrowth')}</span>
        </div>
        <div className="absolute bottom-0 left-12 right-0 h-8 flex items-center justify-center z-10">
          <span className="font-hand text-sm text-navy/60">{t('bcg.relativeShare')}</span>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 ml-12 mb-8" style={{ minHeight: '400px' }}>
          {quadrants.map(({ label, desc, colorClass, pos }) => (
            <div key={pos} className={`matrix-cell ${colorClass} relative`}>
              <div className="mb-2">
                <h4 className="font-hand text-lg font-bold text-navy">{label}</h4>
                <p className="text-xs text-navy/50 font-body">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <svg className="absolute inset-0 pointer-events-none" style={{ left: '48px', bottom: '32px', width: 'calc(100% - 48px)', height: 'calc(100% - 32px)' }}>
          {local.map((item, i) => {
            const x = (100 - item.marketShare) * 0.9 + 5;
            const y = (100 - item.growth) * 0.9 + 5;
            const r = Math.max(12, item.revenue / 4);
            const label = item.name || defaults[i] || `P${i + 1}`;
            return (
              <g key={item.id}>
                <circle cx={`${x}%`} cy={`${y}%`} r={r} fill="rgba(0, 102, 204, 0.25)" stroke="#0066CC" strokeWidth="1.5" />
                <text x={`${x}%`} y={`${y}%`} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '11px', fontFamily: 'Caveat', fill: '#051C2C' }}>
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 hand-drawn p-4">
        <h4 className="font-hand text-lg font-bold text-navy mb-3">{t('bcg.products')}</h4>
        <div className="space-y-2">
          {local.map((item, i) => (
            <div key={item.id} className="flex items-center gap-3 text-sm">
              {editable ? (
                <>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder={defaults[i]}
                    className="flex-1 font-hand"
                  />
                  <span className="text-navy/50 font-body text-xs w-20">{t('bcg.revenue')}</span>
                  <input type="number" value={item.revenue} onChange={(e) => updateItem(item.id, 'revenue', Number(e.target.value))} className="w-16 text-center" />
                  <span className="text-navy/50 font-body text-xs w-16">{t('bcg.growth')}</span>
                  <input type="number" value={item.growth} onChange={(e) => updateItem(item.id, 'growth', Number(e.target.value))} className="w-16 text-center" />
                  <span className="text-navy/50 font-body text-xs w-20">{t('bcg.mktShare')}</span>
                  <input type="number" value={item.marketShare} onChange={(e) => updateItem(item.id, 'marketShare', Number(e.target.value))} className="w-16 text-center" />
                  <button onClick={() => removeItem(item.id)} className="text-navy/30 hover:text-red-500 text-xs no-print">×</button>
                </>
              ) : (
                <span className="font-hand text-base">
                  {item.name || defaults[i]} — {t('bcg.revShort')} {item.revenue}, {t('bcg.growth')} {item.growth}%, {t('bcg.shareShort')} {item.marketShare}%
                </span>
              )}
            </div>
          ))}
        </div>
        {editable && (
          <button onClick={addItem} className="mt-3 text-xs text-mckinsey-blue font-body hover:underline no-print">
            {t('common.addProduct')}
          </button>
        )}
      </div>
    </div>
  );
}
