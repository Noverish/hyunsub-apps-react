import { DependencyList, useEffect } from 'react';

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function isDev() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export function useScrollBottom(callback: () => void, deps: DependencyList) {
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
  }, [deps, callback]);
}
