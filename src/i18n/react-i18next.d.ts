import en from './en';
import ko from './ko';

const resources = { en, ko };

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['ko'];
  };
};
