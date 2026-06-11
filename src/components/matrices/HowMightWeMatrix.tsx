import { useState } from 'react';
import type { HMWData } from '../../types/matrix';
import { useTranslation } from '../../i18n/useTranslation';

interface HowMightWeMatrixProps {
  data: HMWData;
  onChange: (data: HMWData) => void;
  editable: boolean;
}

export function getHMWDefault(): HMWData {
  return {
    userNeeds: ['', ''],
    painPoints: ['', ''],
    insights: ['', ''],
    questions: ['', ''],
  };
}

export default function HowMightWeMatrix({ data, onChange, editable }: HowMightWeMatrixProps) {
  const { t } = useTranslation();
  const [local, setLocal] = useState<HMWData>(data);

  const update = (key: keyof HMWData, index: number, value: string) => {
    const updated = { ...local };
    const arr = [...updated[key]];
    arr[index] = value;
    updated[key] = arr;
    setLocal(updated);
    onChange(updated);
  };

  const addItem = (key: keyof HMWData) => {
    const updated = { ...local, [key]: [...local[key], ''] };
    setLocal(updated);
    onChange(updated);
  };

  const removeItem = (key: keyof HMWData, index: number) => {
    const updated = { ...local, [key]: local[key].filter((_, i) => i !== index) };
    setLocal(updated);
    onChange(updated);
  };

  const sections = [
    { key: 'userNeeds' as const, label: t('howMightWe.userNeeds'), colorClass: 'hl-green', emoji: '👤' },
    { key: 'painPoints' as const, label: t('howMightWe.painPoints'), colorClass: 'hl-pink', emoji: '😣' },
    { key: 'insights' as const, label: t('howMightWe.insights'), colorClass: 'hl-blue', emoji: '💡' },
    { key: 'questions' as const, label: t('howMightWe.questions'), colorClass: 'hl-yellow', emoji: '❓' },
  ];

  const defaults: Record<keyof HMWData, string[]> = {
    userNeeds: [t('howMightWe.n1'), t('howMightWe.n2')],
    painPoints: [t('howMightWe.p1'), t('howMightWe.p2')],
    insights: [t('howMightWe.i1'), t('howMightWe.i2')],
    questions: [t('howMightWe.q1'), t('howMightWe.q2')],
  };

  const getItems = (key: keyof HMWData) => {
    const items = local[key];
    if (items.length === 0 || items.every(i => i === '')) return defaults[key];
    return items;
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-0 hand-drawn overflow-hidden">
        {sections.map(({ key, label, colorClass, emoji }) => (
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
