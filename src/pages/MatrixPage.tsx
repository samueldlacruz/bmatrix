import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { MatrixId } from '../types/matrix';
import { getMatrixConfig } from '../data/templates';
import { usePdfExport } from '../hooks/usePdfExport';
import { useTranslation } from '../i18n/useTranslation';
import PdfDownloadButton from '../components/PdfDownloadButton';
import LanguageToggle from '../components/LanguageToggle';

import SWOTMatrix, { getSWOTDefault } from '../components/matrices/SWOTMatrix';
import BCGMatrix, { getBCGDefault } from '../components/matrices/BCGMatrix';
import AnsoffMatrix, { getAnsoffDefault } from '../components/matrices/AnsoffMatrix';
import McKinseyMatrix, { getMcKinseyDefault } from '../components/matrices/McKinseyMatrix';
import EisenhowerMatrix, { getEisenhowerDefault } from '../components/matrices/EisenhowerMatrix';
import RACIMatrix, { getRACIDefault } from '../components/matrices/RACIMatrix';
import RiskMatrix, { getRiskDefault } from '../components/matrices/RiskMatrix';
import ValueEffortMatrix, { getVEDefault } from '../components/matrices/ValueEffortMatrix';
import HowMightWeMatrix, { getHMWDefault } from '../components/matrices/HowMightWeMatrix';
import EmpathyMapMatrix, { getEmpathyMapDefault } from '../components/matrices/EmpathyMapMatrix';

export default function MatrixPage() {
  const { id } = useParams<{ id: string }>();
  const matrixId = id as MatrixId;
  const { t } = useTranslation();
  const config = getMatrixConfig(matrixId, t(`templates.${matrixId}.name`), t(`templates.${matrixId}.desc`));
  const { ref, exportPdf } = usePdfExport();
  const [editable, setEditable] = useState(true);

  if (!config) {
    return (
      <div className="min-h-screen paper-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-hand text-5xl text-navy mb-4">{t('matrix.notFound')}</h1>
          <Link to="/" className="btn-outline">{t('matrix.backToHome')}</Link>
        </div>
      </div>
    );
  }

  const handleDataChange = (_key: string, data: unknown) => {
    try {
      localStorage.setItem(`bmatrix-${matrixId}`, JSON.stringify(data));
    } catch (e) {
      console.warn('localStorage save error:', e);
    }
  };

  const loadData = (_key: string, factory: () => unknown): unknown => {
    try {
      const saved = localStorage.getItem(`bmatrix-${matrixId}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('localStorage load error:', e);
    }
    return factory();
  };

  const renderMatrix = () => {
    switch (matrixId) {
      case 'swot':
        return (
          <SWOTMatrix
            data={loadData('swot', getSWOTDefault) as ReturnType<typeof getSWOTDefault>}
            onChange={(d) => handleDataChange('swot', d)}
            editable={editable}
          />
        );
      case 'bcg':
        return (
          <BCGMatrix
            data={loadData('bcg', getBCGDefault) as ReturnType<typeof getBCGDefault>}
            onChange={(d) => handleDataChange('bcg', d)}
            editable={editable}
          />
        );
      case 'ansoff':
        return (
          <AnsoffMatrix
            data={loadData('ansoff', getAnsoffDefault) as ReturnType<typeof getAnsoffDefault>}
            onChange={(d) => handleDataChange('ansoff', d)}
            editable={editable}
          />
        );
      case 'mckinsey':
        return (
          <McKinseyMatrix
            data={loadData('mckinsey', getMcKinseyDefault) as ReturnType<typeof getMcKinseyDefault>}
            onChange={(d) => handleDataChange('mckinsey', d)}
            editable={editable}
          />
        );
      case 'eisenhower':
        return (
          <EisenhowerMatrix
            data={loadData('eisenhower', getEisenhowerDefault) as ReturnType<typeof getEisenhowerDefault>}
            onChange={(d) => handleDataChange('eisenhower', d)}
            editable={editable}
          />
        );
      case 'raci':
        return (
          <RACIMatrix
            data={loadData('raci', getRACIDefault) as ReturnType<typeof getRACIDefault>}
            onChange={(d) => handleDataChange('raci', d)}
            editable={editable}
          />
        );
      case 'risk':
        return (
          <RiskMatrix
            data={loadData('risk', getRiskDefault) as ReturnType<typeof getRiskDefault>}
            onChange={(d) => handleDataChange('risk', d)}
            editable={editable}
          />
        );
      case 'value-effort':
        return (
          <ValueEffortMatrix
            data={loadData('ve', getVEDefault) as ReturnType<typeof getVEDefault>}
            onChange={(d) => handleDataChange('ve', d)}
            editable={editable}
          />
        );
      case 'how-might-we':
        return (
          <HowMightWeMatrix
            data={loadData('hmw', getHMWDefault) as ReturnType<typeof getHMWDefault>}
            onChange={(d) => handleDataChange('hmw', d)}
            editable={editable}
          />
        );
      case 'empathy-map':
        return (
          <EmpathyMapMatrix
            data={loadData('empathy', getEmpathyMapDefault) as ReturnType<typeof getEmpathyMapDefault>}
            onChange={(d) => handleDataChange('empathy', d)}
            editable={editable}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen paper-bg paper-grain">
      {/* Language toggle */}
      <div className="fixed top-4 left-3 z-50 no-print">
        <LanguageToggle />
      </div>

      <header className="py-4 sm:py-8 px-4 sm:px-6 border-b border-navy/10 no-print">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="text-navy/40 hover:text-navy transition-colors font-body text-sm sm:text-base">
              {t('matrix.home')}
            </Link>
            <div className="w-px h-8 bg-navy/10 hidden sm:block"></div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-sm text-navy font-hand text-xl sm:text-2xl font-bold ${config.colorClass}`}
              >
                {config.icon}
              </div>
              <div>
                <h1 className="font-hand text-2xl sm:text-4xl font-bold text-navy">{config.name}</h1>
                <p className="text-xs sm:text-base text-navy/50 font-body">{config.description}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setEditable(!editable)}
              className={`btn-outline text-sm sm:text-base ${editable ? 'bg-navy text-white' : ''}`}
            >
              {editable ? t('matrix.lock') : t('matrix.edit')}
            </button>
            <PdfDownloadButton onClick={() => exportPdf(`bmatrix-${matrixId}`)} label={t('common.downloadPdf')} />
          </div>
        </div>
      </header>

      {/* Desktop hint - mobile only */}
      <div className="sm:hidden bg-navy/5 border-b border-navy/10 px-4 py-2 text-center no-print">
        <p className="text-xs text-navy/50 font-body">
          🖥️ {t('matrix.desktopHint')}
        </p>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div ref={ref} className="p-4 sm:p-10 bg-paper">
          {renderMatrix()}
        </div>
      </main>
    </div>
  );
}
