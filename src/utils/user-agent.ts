export const isMobile = () => navigator.userAgent.indexOf('Mobi') !== -1;
export const isIOS = () =>
  ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)
  || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
export const isAOS = () => /android/i.test(navigator.userAgent);
