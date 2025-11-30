'use client';

import React from 'react';
import Image from 'next/image';

interface DoorProps {
  day: number;
  isUnlocked: boolean;
  onClick: () => void;
}

/**
 * Door Component
 * 
 * Represents a single door in the advent calendar.
 * Displays the day number and shows locked/unlocked state with visual indicators.
 * 
 * Requirements: 1.1, 2.4, 2.5, 2.6, 5.1
 */
export default function Door({ day, isUnlocked, onClick }: Readonly<DoorProps>) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Handle Enter and Space keys for keyboard accessibility
    if (isUnlocked && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={!isUnlocked}
      className={`
        relative
        p-6
        flex
        flex-col
        items-center
        justify-center
        min-h-[120px]
        focus:outline-none
        focus:ring-4
        focus:ring-yellow-400
        focus:ring-offset-2
        focus:ring-offset-slate-900
        will-change-transform
        pixel-text
        font-black
        pixel-grid
        ${
          isUnlocked
            ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 cursor-pointer retro-box border-cyan-300 transition-all duration-200 ease-out hover:scale-110 hover:brightness-125 active:scale-105'
            : 'bg-gradient-to-br from-gray-600 to-gray-700 opacity-70 cursor-not-allowed retro-box border-gray-500 transition-all duration-200'
        }
      `}
      style={{
        transform: isUnlocked ? 'translateZ(0)' : undefined,
      }}
      aria-label={`Door ${day}, ${isUnlocked ? 'unlocked, click to open' : 'locked until December ' + day}`}
      aria-disabled={!isUnlocked}
      tabIndex={0}
    >
      {/* Retro gaming background pattern - more pixelated */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: isUnlocked 
          ? 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 16px), repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 16px)'
          : 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 8px)'
      }} />

      {/* Day Number - Extra pixelated */}
      <span
        className={`
          text-5xl
          md:text-6xl
          font-black
          relative
          z-10
          pixel-header
          ${isUnlocked ? 'text-white' : 'text-gray-400'}
          transition-all
          duration-200
          will-change-transform
        `}
        style={{
          transform: 'translateZ(0)',
          fontFamily: 'Courier New, Courier, monospace',
          textShadow: isUnlocked 
            ? '4px 4px 0px rgba(0, 0, 0, 1), -2px -2px 0px rgba(255, 255, 255, 0.4), 0 0 15px rgba(0, 168, 232, 0.6)'
            : '3px 3px 0px rgba(0, 0, 0, 0.8)',
        }}
      >
        {day}
      </span>

      {/* Lock Icon - Only shown when locked */}
      {!isUnlocked && (
        <div className="absolute top-2 right-2 transition-opacity duration-300 will-change-transform" style={{ transform: 'translateZ(0)' }}>
          <div className="text-2xl">🔒</div>
        </div>
      )}

      {/* Unlocked Indicator - Tux penguin */}
      {isUnlocked && (
        <div className="absolute top-2 right-2 w-8 h-8 animate-door-unlock will-change-transform" style={{ transform: 'translateZ(0)' }}>
          <div className="animate-pulse will-change-transform w-full h-full" style={{ 
            transform: 'translateZ(0)',
            filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8)) drop-shadow(3px 3px 0px rgba(0, 0, 0, 0.8))'
          }}>
            <Image src="/images/tux.png" alt="" width={32} height={32} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Snowflake decoration for unlocked doors */}
      {isUnlocked && (
        <div className="absolute bottom-2 left-2 text-xl opacity-80">
          ❄️
        </div>
      )}

      {/* Hover hint for unlocked doors */}
      {isUnlocked && (
        <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 will-change-transform absolute bottom-2" style={{ transform: 'translateZ(0)' }}>
          PRESS!
        </span>
      )}
    </button>
  );
}
