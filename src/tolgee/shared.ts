import { FormatIcu } from '@tolgee/format-icu';
import { BackendFetch, DevTools, Tolgee } from '@tolgee/web';

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY_MAIN;
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL_MAIN;

export const ALL_LANGUAGES = ['en', 'cs', 'de', 'fr'];

export const DEFAULT_LANGUAGE = 'en';

export function TolgeeBase() {
  const tolgee = Tolgee()
    .use(FormatIcu());
  
  // BackendFetch and DevTools only work in browser environment
  if (typeof window !== 'undefined') {
    tolgee.use(BackendFetch({
      prefix: 'https://tolgee.voov.cc/v2/projects/4/translations',
      headers: {
        'X-API-Key': apiKey || '',
      },
      getPath: ({ language }) => `/${language}`,
    }));
    tolgee.use(DevTools());
  }
  
  return tolgee.updateDefaults({
      apiKey,
      apiUrl,
      fallbackLanguage: 'en',
      staticData: {
        en: () => import('../../messages/en.json'),
        cs: () => import('../../messages/cs.json'),
        de: () => import('../../messages/de.json'),
        fr: () => import('../../messages/fr.json'),
      },
    });
}
