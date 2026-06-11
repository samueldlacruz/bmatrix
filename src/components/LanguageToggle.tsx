import { useLanguage } from '../i18n/context';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const toggle = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 font-body text-sm font-medium border border-navy/20 rounded-sm overflow-hidden hover:border-navy/40 transition-colors"
    >
      <span
        className={`px-2 py-1 transition-colors ${
          lang === 'es' ? 'bg-navy text-white' : 'text-navy/60 hover:bg-navy/5'
        }`}
      >
        ES
      </span>
      <span
        className={`px-2 py-1 transition-colors ${
          lang === 'en' ? 'bg-navy text-white' : 'text-navy/60 hover:bg-navy/5'
        }`}
      >
        EN
      </span>
    </button>
  );
}
