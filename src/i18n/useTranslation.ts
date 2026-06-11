import { useLanguage, type Lang } from './context';
import { es } from './es';
import { en } from './en';

const translations: Record<Lang, Record<string, unknown>> = { es, en };

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  return typeof current === 'string' ? current : path;
}

export function useTranslation() {
  const { lang, setLang } = useLanguage();

  const t = (key: string): string => {
    return getNestedValue(translations[lang], key);
  };

  return { t, lang, setLang };
}
