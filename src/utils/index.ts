import { useEffect } from 'react';

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function isDev() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export function toJSON(obj: any) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}

export function useScrollBottom(callback: () => void) {
  useEffect(() => {
    const handler = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const remaining = totalHeight - scrollY - windowHeight;

      if (remaining < 100) {
        callback();
      }
    };

    document.addEventListener('scroll', handler);

    return () => {
      document.removeEventListener('scroll', handler);
    }
  }, [callback]);
}

export function urlToName(url: string) {
  return decodeURIComponent(url.split('/').reverse()[0]);
}

export function numberWithComma(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function filterEmptyString(obj: any): any {
  const result: any = {};

  Object.entries(obj).forEach(([k, v]) => {
    if (v !== '') {
      result[k] = v;
    }
  })

  return result;
}
