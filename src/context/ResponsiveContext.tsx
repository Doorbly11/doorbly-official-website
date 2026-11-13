/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Responsive Context & Auto Adjustment Layout Engine
 * Provides real-time screen measurement, breakpoint classification,
 * and user-switchable layout density modes (Auto / Compact / Comfortable).
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ScreenCategory = 'mobile-xs' | 'mobile' | 'tablet' | 'desktop' | 'ultrawide';
export type LayoutDensity = 'auto' | 'compact' | 'comfortable';

interface ResponsiveContextType {
  width: number;
  height: number;
  screenCategory: ScreenCategory;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isUltrawide: boolean;
  isTouch: boolean;
  density: LayoutDensity;
  effectiveDensity: 'compact' | 'comfortable';
  setDensity: (mode: LayoutDensity) => void;
  isAutoAdjusting: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

export const ResponsiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const [density, setDensity] = useState<LayoutDensity>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('doorbly_layout_density');
      if (saved === 'compact' || saved === 'comfortable' || saved === 'auto') {
        return saved as LayoutDensity;
      }
    }
    return 'auto';
  });

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSetDensity = (newDensity: LayoutDensity) => {
    setDensity(newDensity);
    localStorage.setItem('doorbly_layout_density', newDensity);
  };

  const width = dimensions.width;
  let screenCategory: ScreenCategory = 'desktop';
  if (width < 375) screenCategory = 'mobile-xs';
  else if (width < 640) screenCategory = 'mobile';
  else if (width < 1024) screenCategory = 'tablet';
  else if (width < 1536) screenCategory = 'desktop';
  else screenCategory = 'ultrawide';

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;
  const isUltrawide = width >= 1536;

  // Determine effective density:
  // In 'auto' mode: mobile is compact for max viewport efficiency; desktop/tablet is comfortable
  let effectiveDensity: 'compact' | 'comfortable' = 'comfortable';
  if (density === 'auto') {
    effectiveDensity = isMobile ? 'compact' : 'comfortable';
  } else {
    effectiveDensity = density;
  }

  return (
    <ResponsiveContext.Provider
      value={{
        width: dimensions.width,
        height: dimensions.height,
        screenCategory,
        isMobile,
        isTablet,
        isDesktop,
        isUltrawide,
        isTouch,
        density,
        effectiveDensity,
        setDensity: handleSetDensity,
        isAutoAdjusting: density === 'auto',
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = (): ResponsiveContextType => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};
