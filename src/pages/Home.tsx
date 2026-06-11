import { useMemo } from 'react';
import MatrixCard from '../components/MatrixCard';
import LanguageToggle from '../components/LanguageToggle';
import { useTranslation } from '../i18n/useTranslation';
import { matrixIds, getMatrixConfig } from '../data/templates';
import { getRandomLayout } from '../data/bentoLayouts';

function HeroIllustration() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="hand-drawn bg-paper p-5 shadow-lg float-animation">
        <div className="grid grid-cols-2 gap-0">
          <div className="p-3 hl-green">
            <div className="font-hand text-lg font-bold text-navy mb-1">{t('hero.strengths')}</div>
            <div className="space-y-1">
              <div className="h-2 bg-navy/10 rounded-full w-full"></div>
              <div className="h-2 bg-navy/10 rounded-full w-4/5"></div>
            </div>
          </div>
          <div className="p-3 hl-pink">
            <div className="font-hand text-lg font-bold text-navy mb-1">{t('hero.weaknesses')}</div>
            <div className="space-y-1">
              <div className="h-2 bg-navy/10 rounded-full w-full"></div>
              <div className="h-2 bg-navy/10 rounded-full w-3/4"></div>
            </div>
          </div>
          <div className="p-3 hl-blue">
            <div className="font-hand text-lg font-bold text-navy mb-1">{t('hero.opportunities')}</div>
            <div className="space-y-1">
              <div className="h-2 bg-navy/10 rounded-full w-5/6"></div>
              <div className="h-2 bg-navy/10 rounded-full w-full"></div>
            </div>
          </div>
          <div className="p-3 hl-orange">
            <div className="font-hand text-lg font-bold text-navy mb-1">{t('hero.threats')}</div>
            <div className="space-y-1">
              <div className="h-2 bg-navy/10 rounded-full w-2/3"></div>
              <div className="h-2 bg-navy/10 rounded-full w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -right-4 hand-drawn bg-paper p-3 shadow-md" style={{ transform: 'rotate(6deg)' }}>
        <div className="hl-yellow px-3 py-1">
          <span className="font-hand text-sm font-bold text-navy">{t('hero.bcgBadge')}</span>
        </div>
      </div>

      <div className="absolute -bottom-3 -left-3 hand-drawn bg-paper p-3 shadow-md" style={{ transform: 'rotate(-4deg)' }}>
        <div className="hl-purple px-3 py-1">
          <span className="font-hand text-sm font-bold text-navy">{t('hero.mckinseyBadge')}</span>
        </div>
      </div>

      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-dashed border-mckinsey-blue/20"></div>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();

  const matrices = matrixIds
    .map((id) => {
      const name = t(`templates.${id}.name`);
      const desc = t(`templates.${id}.desc`);
      return getMatrixConfig(id, name === `templates.${id}.name` ? id : name, desc === `templates.${id}.desc` ? id : desc);
    })
    .filter((m): m is NonNullable<typeof m> => m !== null);

  const bentoLayout = useMemo(() => getRandomLayout(), []);

  return (
    <div className="min-h-screen grid-paper">
      {/* Language toggle */}
      <div className="fixed top-4 right-2 z-50">
        <LanguageToggle />
      </div>

      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-8">
              <div>
                <h1 className="font-hand text-7xl md:text-8xl font-bold text-navy leading-none">
                  {t('home.title')}
                </h1>
                <div className="mt-4 w-20 h-1 bg-mckinsey-blue"></div>
              </div>

              <p className="font-body text-xl md:text-2xl text-navy/70 font-light leading-relaxed max-w-lg">
                {t('home.subtitle')}
              </p>

              <p className="font-body text-base text-navy/50 leading-relaxed max-w-md">
                {t('home.description')}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="#matrices"
                  className="btn-primary text-lg px-8 py-4"
                >
                  {t('home.cta')}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </a>
                <span className="font-body text-sm text-navy/30">{t('home.matricesCount')}</span>
              </div>
            </div>

            {/* Right - Illustration */}
            <div className="hidden lg:block">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Matrices Grid */}
      <section id="matrices" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-hand text-5xl font-bold text-navy mb-3">{t('home.chooseTitle')}</h2>
            <p className="font-body text-lg text-navy/50">{t('home.chooseSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
            {bentoLayout.map((cell) => {
              const matrix = matrices.find((m) => m.id === cell.id);
              if (!matrix) return null;
              return (
                <MatrixCard
                  key={matrix.id}
                  matrix={matrix}
                  openLabel={`${t('home.chooseSubtitle').split(' ')[0]} →`}
                  size={cell.size}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 border-t border-navy/10">
        <p className="font-hand text-2xl text-navy/30">BMatrix</p>
      </footer>
    </div>
  );
}
