export const isMobile = () => isIOS() || isAOS();
export const isIOS = () =>
  ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
export const isAOS = () => /android/i.test(navigator.userAgent);
export const isApp = () => /Hyunsub/i.test(navigator.userAgent);
export const isMac = () => /mac/i.test(navigator.userAgent);
