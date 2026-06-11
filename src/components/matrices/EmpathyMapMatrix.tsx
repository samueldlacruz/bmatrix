import { useState } from 'react';
import type { EmpathyMapData } from '../../types/matrix';
import { useTranslation } from '../../i18n/useTranslation';

interface EmpathyMapMatrixProps {
  data: EmpathyMapData;
  onChange: (data: EmpathyMapData) => void;
  editable: boolean;
}

export function getEmpathyMapDefault(): EmpathyMapData {
  return {
    says: ['', ''],
    thinks: ['', ''],
    does: ['', ''],
    feels: ['', ''],
  };
}

export default function EmpathyMapMatrix({ data, onChange, editable }: EmpathyMapMatrixProps) {
  const { t } = useTranslation();
  const [local, setLocal] = useState<EmpathyMapData>(data);

  const update = (key: keyof EmpathyMapData, index: number, value: string) => {
    const updated = { ...local };
    const arr = [...updated[key]];
    arr[index] = value;
    updated[key] = arr;
    setLocal(updated);
    onChange(updated);
  };

  const addItem = (key: keyof EmpathyMapData) => {
    const updated = { ...local, [key]: [...local[key], ''] };
    setLocal(updated);
    onChange(updated);
  };

  const removeItem = (key: keyof EmpathyMapData, index: number) => {
    const updated = { ...local, [key]: local[key].filter((_, i) => i !== index) };
    setLocal(updated);
    onChange(updated);
  };

  const sections = [
    { key: 'says' as const, label: t('empathyMap.says'), colorClass: 'hl-blue', emoji: '💬' },
    { key: 'thinks' as const, label: t('empathyMap.thinks'), colorClass: 'hl-purple', emoji: '🧠' },
    { key: 'does' as const, label: t('empathyMap.does'), colorClass: 'hl-green', emoji: '🏃' },
    { key: 'feels' as const, label: t('empathyMap.feels'), colorClass: 'hl-pink', emoji: '❤️' },
  ];

  const defaults: Record<keyof EmpathyMapData, string[]> = {
    says: [t('empathyMap.s1'), t('empathyMap.s2')],
    thinks: [t('empathyMap.t1'), t('empathyMap.t2')],
    does: [t('empathyMap.d1'), t('empathyMap.d2')],
    feels: [t('empathyMap.f1'), t('empathyMap.f2')],
  };

  const getItems = (key: keyof EmpathyMapData) => {
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
