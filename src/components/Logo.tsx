/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Brand Logo Component
 * - Lightweight continuous 3D logo flip
 * - Clean circular golden light orbit
 */

import React, { useState } from 'react';
import { doorblyConfig } from '../config/doorblyConfig.ts';

interface LogoProps {
  variant?: 'light' | 'dark' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
  showWordmark = true,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(doorblyConfig.officialLogoUrl);

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const imageSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const orbitSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const lightSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2',
  };

  const isWhite = variant === 'white';
  const textColor = isWhite ? 'text-white' : 'text-[#172B2A]';

  const handleImageError = () => {
    if (imgSrc !== '/logo.png') {
      setImgSrc('/logo.png');
    }
  };

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Light Circular Golden Orbit & Flipping Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${orbitSizes[size]}`}>
        {/* Subtle Hairline Orbit Path */}
        <div className="absolute inset-0 rounded-full border border-amber-400/30 pointer-events-none" />

        {/* Golden Light Orbiting in a Circular Path */}
        <div className="absolute inset-0 rounded-full animate-golden-orbit pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className={`rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] ${lightSizes[size]}`} />
          </div>
        </div>

        {/* Flipping Emblem */}
        <div className="relative z-10 flex items-center justify-center animate-logo-flip">
          <img
            src={imgSrc}
            alt="Doorbly Official Logo"
            className={`${imageSizes[size]} object-contain`}
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        </div>
      </div>

      {/* Typography Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className={`${sizeClasses[size]} font-extrabold tracking-tight font-display ${textColor}`}>
            Door<span className={isWhite ? 'text-[#DDF4ED]' : 'text-[#0F766E]'}>bly</span>
          </span>
        </div>
      )}
    </div>
  );
};
