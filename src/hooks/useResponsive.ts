
import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface WindowSize {
  width: number;
  height: number;
  breakpoint: Breakpoint;
}

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  return 'xl';
};

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: getBreakpoint(window.innerWidth),
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowSize({
        width,
        height: window.innerHeight,
        breakpoint: getBreakpoint(width),
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...windowSize,
    isMobile: windowSize.breakpoint === 'xs',
    isTablet: windowSize.breakpoint === 'sm' || windowSize.breakpoint === 'md',
    isDesktop: windowSize.breakpoint === 'lg' || windowSize.breakpoint === 'xl',
  };
};
