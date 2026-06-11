import { Link } from 'react-router-dom';
import type { MatrixConfig } from '../types/matrix';
import type { BentoSize } from '../data/bentoLayouts';
import { getBentoClasses } from '../data/bentoLayouts';

interface MatrixCardProps {
  matrix: MatrixConfig;
  openLabel: string;
  size?: BentoSize;
}

export default function MatrixCard({ matrix, openLabel, size = 'small' }: MatrixCardProps) {
  const bentoClasses = getBentoClasses(size);

  return (
    <Link
      to={`/matrix/${matrix.id}`}
      className={`group block paper-grain hand-drawn bg-paper hover:shadow-lg transition-all duration-200 overflow-hidden ${bentoClasses} ${
        size === 'large' ? 'p-8' : 'p-6'
      }`}
    >
      <div className="flex flex-col items-center text-center h-full justify-center overflow-hidden">
        <div
          className={`flex items-center justify-center rounded-sm text-navy font-hand font-bold mb-4 ${matrix.colorClass} ${
            size === 'large' ? 'w-20 h-20 text-5xl' : size === 'medium' ? 'w-14 h-14 text-4xl' : 'w-14 h-14 text-3xl'
          }`}
        >
          {matrix.icon}
        </div>
        <h3 className={`font-hand font-bold text-navy group-hover:text-mckinsey-blue transition-colors ${
          size === 'large' ? 'text-5xl' : size === 'medium' ? 'text-4xl' : 'text-3xl'
        }`}>
          {matrix.name}
        </h3>
        <p className={`text-navy/60 mt-2 font-body leading-relaxed ${
          size === 'large' ? 'text-lg mt-3' : 'text-base mt-2'
        }`}>
          {matrix.description}
        </p>
        <div className={`text-sm text-navy/40 font-body ${size === 'large' ? 'mt-5' : 'mt-2'}`}>
          <span className="group-hover:text-mckinsey-blue transition-colors">
            {openLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
