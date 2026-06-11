import { useState } from 'react';
import type { RACIRow } from '../../types/matrix';
import { useTranslation } from '../../i18n/useTranslation';

interface RACIMatrixProps {
  data: RACIRow[];
  onChange: (data: RACIRow[]) => void;
  editable: boolean;
}

const defaultRoleKeys = ['raci.r1', 'raci.r2', 'raci.r3', 'raci.r4'];

export function getRACIDefault(): RACIRow[] {
  return [
    { id: '1', task: '', assignments: {} },
    { id: '2', task: '', assignments: {} },
    { id: '3', task: '', assignments: {} },
    { id: '4', task: '', assignments: {} },
  ];
}

export default function RACIMatrix({ data, onChange, editable }: RACIMatrixProps) {
  const { t } = useTranslation();
  const [local, setLocal] = useState<RACIRow[]>(data);
  const [roleKeys, setRoleKeys] = useState<string[]>(defaultRoleKeys);

  const roles = roleKeys.map(k => t(k));

  const raciOptions: Array<{ value: string; label: string; color: string }> = [
    { value: 'R', label: t('raci.responsible'), color: 'hl-green' },
    { value: 'A', label: t('raci.accountable'), color: 'hl-blue' },
    { value: 'C', label: t('raci.consulted'), color: 'hl-orange' },
    { value: 'I', label: t('raci.informed'), color: 'hl-yellow' },
  ];

  const defaultTasks = [t('raci.t1'), t('raci.t2'), t('raci.t3'), t('raci.t4')];

  const updateTask = (id: string, task: string) => {
    const updated = local.map((r) => (r.id === id ? { ...r, task } : r));
    setLocal(updated);
    onChange(updated);
  };

  const updateAssignment = (rowId: string, role: string, value: string) => {
    const updated = local.map((r) =>
      r.id === rowId ? { ...r, assignments: { ...r.assignments, [role]: value } } : r
    ) as RACIRow[];
    setLocal(updated);
    onChange(updated);
  };

  const addRow = () => {
    const newRow: RACIRow = {
      id: Date.now().toString(),
      task: t('common.newTask'),
      assignments: Object.fromEntries(roles.map((r) => [r, ''])),
    };
    const updated = [...local, newRow];
    setLocal(updated);
    onChange(updated);
  };

  const removeRow = (id: string) => {
    const updated = local.filter((r) => r.id !== id);
    setLocal(updated);
    onChange(updated);
  };

  const addRole = () => {
    const newKey = `raci.r${roleKeys.length + 1}`;
    setRoleKeys([...roleKeys, newKey]);
  };

  return (
    <div>
      <div className="flex gap-4 mb-4 flex-wrap">
        {raciOptions.map(({ value, label, color }) => (
          <div key={value} className="flex items-center gap-2">
            <span className={`w-6 h-6 flex items-center justify-center font-hand text-sm font-bold ${color} hand-drawn`}>
              {value}
            </span>
            <span className="text-xs font-body text-navy/60">{label}</span>
          </div>
        ))}
      </div>

      <div className="hand-drawn overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 font-hand text-lg text-navy border-b border-navy/20">{t('raci.task')}</th>
              {roles.map((role) => (
                <th key={role} className="p-3 font-hand text-sm text-navy border-b border-navy/20 text-center min-w-[120px]">
                  {role}
                </th>
              ))}
              {editable && <th className="w-8 border-b border-navy/20 no-print"></th>}
            </tr>
          </thead>
          <tbody>
            {local.map((row, i) => (
              <tr key={row.id} className="hover:bg-navy/[0.02]">
                <td className="p-3 border-b border-navy/10">
                  {editable ? (
                    <input
                      type="text"
                      value={row.task}
                      onChange={(e) => updateTask(row.id, e.target.value)}
                      placeholder={row.task === '' ? defaultTasks[i] || '' : ''}
                      className="font-hand text-sm w-full"
                    />
                  ) : (
                    <span className="font-hand text-sm">{row.task || defaultTasks[i] || ''}</span>
                  )}
                </td>
                {roles.map((role) => (
                  <td key={role} className="p-3 border-b border-navy/10 text-center">
                    {editable ? (
                      <select
                        value={row.assignments[role] || ''}
                        onChange={(e) => updateAssignment(row.id, role, e.target.value)}
                        className="font-hand text-lg bg-transparent border-none cursor-pointer text-center"
                      >
                        <option value="">-</option>
                        {raciOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.value} - {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`inline-block w-8 h-8 leading-8 font-hand text-lg font-bold ${raciOptions.find((o) => o.value === row.assignments[role])?.color || ''}`}>
                        {row.assignments[role] || '-'}
                      </span>
                    )}
                  </td>
                ))}
                {editable && (
                  <td className="border-b border-navy/10 no-print">
                    <button onClick={() => removeRow(row.id)} className="text-navy/30 hover:text-red-500 text-xs">×</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editable && (
        <div className="mt-3 flex gap-3 no-print">
          <button onClick={addRow} className="text-xs text-mckinsey-blue font-body hover:underline">
            {t('common.addTask')}
          </button>
          <button onClick={addRole} className="text-xs text-mckinsey-blue font-body hover:underline">
            {t('common.addRole')}
          </button>
        </div>
      )}
    </div>
  );
}
