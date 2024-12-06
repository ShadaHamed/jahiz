// @types/next-i18next.d.ts
import 'next-i18next';

declare module 'next-i18next' {
  interface I18next {
    t: (key: string, options?: object) => string;
  }
}
