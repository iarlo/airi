import { resources } from '@config/i18n/main';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: (typeof resources)['pt-BR'];
  }
}
