import { useState } from 'react';
import type { EisenhowerTask } from '../../types/matrix';
import { useTranslation } from '../../i18n/useTranslation';

interface EisenhowerMatrixProps {
  data: EisenhowerTask[];
  onChange: (data: EisenhowerTask[]) => void;
  editable: boolean;
}

export function getEisenhowerDefault(): EisenhowerTask[] {
  return [
    { id: '1', text: '', quadrant: 'do' },
    { id: '2', text: '', quadrant: 'schedule' },
    { id: '3', text: '', quadrant: 'delegate' },
    { id: '4', text: '', quadrant: 'eliminate' },
  ];
}

export default function EisenhowerMatrix({ data, onChange, editable }: EisenhowerMatrixProps) {
  const { t } = useTranslation();
  const [local, setLocal] = useState<EisenhowerTask[]>(data);

  const defaults = [t('eisenhower.t1'), t('eisenhower.t2'), t('eisenhower.t3'), t('eisenhower.t4')];

  const quadrants = [
    { key: 'do' as const, label: t('eisenhower.doFirst'), sub: t('eisenhower.doFirstSub'), colorClass: 'hl-pink', emoji: '🔥' },
    { key: 'schedule' as const, label: t('eisenhower.schedule'), sub: t('eisenhower.scheduleSub'), colorClass: 'hl-blue', emoji: '📅' },
    { key: 'delegate' as const, label: t('eisenhower.delegate'), sub: t('eisenhower.delegateSub'), colorClass: 'hl-orange', emoji: '👥' },
    { key: 'eliminate' as const, label: t('eisenhower.eliminate'), sub: t('eisenhower.eliminateSub'), colorClass: 'hl-yellow', emoji: '🗑️' },
  ];

  const addTask = (quadrant: EisenhowerTask['quadrant']) => {
    const newTask: EisenhowerTask = { id: Date.now().toString(), text: '', quadrant };
    const updated = [...local, newTask];
    setLocal(updated);
    onChange(updated);
  };

  const updateTask = (id: string, text: string) => {
    const updated = local.map((task) => (task.id === id ? { ...task, text } : task));
    setLocal(updated);
    onChange(updated);
  };

  const removeTask = (id: string) => {
    const updated = local.filter((t) => t.id !== id);
    setLocal(updated);
    onChange(updated);
  };

  const moveTask = (id: string, newQuadrant: EisenhowerTask['quadrant']) => {
    const updated = local.map((t) => (t.id === id ? { ...t, quadrant: newQuadrant } : t));
    setLocal(updated);
    onChange(updated);
  };

  const quadrantDefaults: Record<string, string[]> = {
    do: [defaults[0]],
    schedule: [defaults[1]],
    delegate: [defaults[2]],
    eliminate: [defaults[3]],
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-32 mb-2">
        <span className="font-hand text-sm text-navy/60">{t('eisenhower.urgent')}</span>
        <span className="font-hand text-sm text-navy/60">{t('eisenhower.notUrgent')}</span>
      </div>

      <div className="flex">
        <div className="flex flex-col justify-center items-center w-16 gap-4">
          <span className="font-hand text-sm text-navy/60 -rotate-90 whitespace-nowrap">{t('eisenhower.important')}</span>
          <span className="font-hand text-sm text-navy/60 -rotate-90 whitespace-nowrap">{t('eisenhower.notImportant')}</span>
        </div>

        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-0 hand-drawn overflow-hidden">
          {quadrants.map(({ key, label, sub, colorClass, emoji }) => {
            const tasks = local.filter((task) => task.quadrant === key);
            const displayTasks = tasks.length > 0 ? tasks : (quadrantDefaults[key] || []).map((text, i) => ({ id: `default-${key}-${i}`, text, quadrant: key }));

            return (
              <div key={key} className={`matrix-cell ${colorClass}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{emoji}</span>
                  <div>
                    <h4 className="font-hand text-lg font-bold text-navy">{label}</h4>
                    <p className="text-xs text-navy/50 font-body">{sub}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {displayTasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-2">
                      {editable ? (
                        <>
                          <input
                            type="text"
                            value={task.text}
                            onChange={(e) => updateTask(task.id, e.target.value)}
                            placeholder={task.text === '' ? (quadrantDefaults[key]?.[0] || '') : ''}
                            className="flex-1 font-hand text-sm"
                          />
                          <select
                            value={task.quadrant}
                            onChange={(e) => moveTask(task.id, e.target.value as EisenhowerTask['quadrant'])}
                            className="text-xs border-b border-navy/20 bg-transparent font-body no-print"
                          >
                            <option value="do">{t('eisenhower.do')}</option>
                            <option value="schedule">{t('eisenhower.scheduleOpt')}</option>
                            <option value="delegate">{t('eisenhower.delegateOpt')}</option>
                            <option value="eliminate">{t('eisenhower.eliminateOpt')}</option>
                          </select>
                          <button onClick={() => removeTask(task.id)} className="text-navy/30 hover:text-red-500 text-xs no-print">×</button>
                        </>
                      ) : (
                        <span className="font-hand text-sm text-navy">{task.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {editable && (
                  <button onClick={() => addTask(key)} className="mt-2 text-xs text-mckinsey-blue font-body hover:underline no-print">
                    {t('common.addTask')}
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
