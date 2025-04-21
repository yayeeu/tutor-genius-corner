
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Logger from '@/utils/logger';

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
  const { toast } = useToast();
  const [config, setConfig] = useState<ResponsiveConfig>(() => {
    try {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      return {
        width,
        height,
        breakpoint: getBreakpoint(width),
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        orientation: height > width ? 'portrait' : 'landscape'
      };
    } catch (error) {
      Logger.error('Failed to initialize responsive config', { error });
      // Fallback to mobile-first defaults
      return {
        width: 360,
        height: 640,
        breakpoint: 'xs',
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        orientation: 'portrait'
      };
    }
  });

  useEffect(() => {
    const handleResize = () => {
      try {
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
      } catch (error) {
        Logger.error('Error handling window resize', { error });
        toast({
          title: "Display Error",
          description: "Failed to update display settings. Please refresh the page.",
          variant: "destructive"
        });
      }
    };

    try {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } catch (error) {
      Logger.error('Failed to add resize listener', { error });
    }
  }, [toast]);

  return config;
};
