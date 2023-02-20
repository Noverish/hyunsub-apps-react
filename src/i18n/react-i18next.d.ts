import ko from './ko';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof ko;
  };
};
