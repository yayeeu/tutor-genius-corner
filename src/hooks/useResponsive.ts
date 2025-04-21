
import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ResponsiveConfig {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
}

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

const getBreakpoint = (width: number): Breakpoint => {
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  return 'xl';
};

export const useResponsive = (): ResponsiveConfig => {
  const [config, setConfig] = useState<ResponsiveConfig>({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: getBreakpoint(window.innerWidth),
    isMobile: window.innerWidth < breakpoints.md,
    isTablet: window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg,
    isDesktop: window.innerWidth >= breakpoints.lg,
    orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const breakpoint = getBreakpoint(width);
      
      setConfig({
        width,
        height,
        breakpoint,
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        orientation: height > width ? 'portrait' : 'landscape'
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return config;
};

