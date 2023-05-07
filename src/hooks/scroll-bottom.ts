import { useEffect } from 'react';

export default function useScrollBottom(callback: () => void) {
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
    };
  }, [callback]);
}
