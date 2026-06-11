import { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export function usePdfExport() {
  const ref = useRef<HTMLDivElement>(null);

  const exportPdf = useCallback(async (filename: string) => {
    if (!ref.current) return;

    try {
      await document.fonts.ready;
      await new Promise((resolve) => setTimeout(resolve, 200));

      const element = ref.current;

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#F8F6F1',
        style: {
          transform: 'none',
        },
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(pdfWidth / img.width, (pdfHeight - 20) / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;

      const x = (pdfWidth - w) / 2;
      const y = 10;

      pdf.addImage(dataUrl, 'PNG', x, y, w, h);
      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    }
  }, []);

  return { ref, exportPdf };
}
