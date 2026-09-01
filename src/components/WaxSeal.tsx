import React from 'react';
import { WaxSealType, WaxSealColor } from '../types';
import { WAX_COLORS } from '../utils/templates';

interface WaxSealProps {
  type?: WaxSealType;
  color?: WaxSealColor;
  initialText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  className?: string;
  showSparkle?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  type = 'envelope-heart',
  color = 'crimson',
  initialText = 'চি',
  size = 'md',
  className = '',
  showSparkle = false,
}) => {
  const colorConfig = WAX_COLORS.find(c => c.id === color) || WAX_COLORS[0];

  // Derive initial from provided string or default
  const displayInitial = (initialText ? initialText.trim().charAt(0) : 'চি') || 'চি';

  const sizeClasses = typeof size === 'string' ? {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-10 h-10 text-xs sm:text-sm',
    lg: 'w-12 h-12 text-base sm:text-lg',
    xl: 'w-14 h-14 text-xl',
    '2xl': 'w-16 h-16 text-2xl',
  }[size] : '';

  const inlineSize = typeof size === 'number' ? {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${Math.round(size * 0.38)}px`
  } : {};

  // Render emblem
  const renderEmblem = () => {
    switch (type) {
      case 'heart':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'rose':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a4 4 0 0 0-4 4c0 3 4 5 4 8 0-3 4-5 4-8a4 4 0 0 0-4-4z" fill="currentColor" fillOpacity="0.4" />
            <path d="M12 15v6" />
            <path d="M9 18c1.5-1 3-1 3-1s1.5 0 3 1" />
          </svg>
        );
      case 'crown':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3H5v-1h14v1z" />
          </svg>
        );
      case 'feather':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 12.5V21h8.5z" fill="currentColor" fillOpacity="0.3" />
            <line x1="16" y1="8" x2="2" y2="22" />
            <line x1="17.5" y1="15" x2="9" y2="15" />
          </svg>
        );
      case 'lotus':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3c-2 4-2 7 0 11 2-4 2-7 0-11z" fill="currentColor" fillOpacity="0.4" />
            <path d="M12 14c-3-2-6-2-8 1 3 3 7 3 8-1z" />
            <path d="M12 14c3-2 6-2 8 1-3 3-7 3-8-1z" />
          </svg>
        );
      case 'star':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 6.9 7.6.3-5.8 4.7 2 7.1-6.2-4.2-6.2 4.2 2-7.1-5.8-4.7 7.6-.3z" />
          </svg>
        );
      case 'tree':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a6 6 0 0 0-6 6c0 2.2 1.2 4.1 3 5.1V19H7v2h10v-2h-2v-5.9c1.8-1 3-2.9 3-5.1a6 6 0 0 0-6-6z" />
          </svg>
        );
      case 'crescent':
        return (
          <svg className="w-1/2 h-1/2 drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        );
      case 'initial':
        return (
          <span className="font-serif font-black select-none tracking-tight leading-none drop-shadow-xs">
            {displayInitial}
          </span>
        );
      case 'envelope-heart':
      default:
        return (
          <span className="select-none text-[1.1em] drop-shadow-xs">
            💌
          </span>
        );
    }
  };

  return (
    <div
      className={`relative rounded-full flex items-center justify-center transition-all select-none ${sizeClasses} ${className}`}
      style={{
        ...inlineSize,
        background: colorConfig.bgGradient,
        color: colorConfig.textColor,
        boxShadow: `0 4px 12px ${colorConfig.shadowColor}, inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.4)`,
        border: `1.5px solid ${colorConfig.rimColor}`,
      }}
    >
      {/* Outer Wavy Wax Edge Ring */}
      <div 
        className="absolute inset-[2px] rounded-full border border-white/30 pointer-events-none opacity-80"
        style={{
          borderStyle: 'dashed'
        }}
      />

      {/* Inner Recessed Medallion */}
      <div 
        className="w-[78%] h-[78%] rounded-full flex items-center justify-center shadow-inner border border-black/20"
        style={{
          background: 'rgba(0, 0, 0, 0.08)'
        }}
      >
        {renderEmblem()}
      </div>

      {/* Light Reflection Glint */}
      <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px] pointer-events-none" />
    </div>
  );
};
