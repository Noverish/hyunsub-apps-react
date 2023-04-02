import { useEffect, useState } from 'react';

export const Breakpoint = {
  'xs': 0,
  'sm': 1,
  'md': 2,
  'lg': 3,
  'xl': 4,
  'xxl': 5,
}

export type BreakpointCode = 0 | 1 | 2 | 3 | 4 | 5;

function getWidth(point: keyof typeof Breakpoint): number {
  switch(point) {
    case 'sm': return 576;
    case 'md': return 768;
    case 'lg': return 992;
    case 'xl': return 1200;
    case 'xxl': return 1400;
    default: return -1;
  }
}

export function useBreakPoint(): BreakpointCode {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (width >= getWidth('xxl')) {
    return Breakpoint.xxl as BreakpointCode;
  } else if (width >= getWidth('xl')) {
    return Breakpoint.xl as BreakpointCode;
  } else if (width >= getWidth('lg')) {
    return Breakpoint.lg as BreakpointCode;
  } else if (width >= getWidth('md')) {
    return Breakpoint.md as BreakpointCode;
  } else if (width >= getWidth('sm')) {
    return Breakpoint.sm as BreakpointCode;
  } else {
    return Breakpoint.xs as BreakpointCode;
  }
}

export function useBreakpointMobile(): boolean {
  return useBreakPoint() <= Breakpoint.sm;
}
