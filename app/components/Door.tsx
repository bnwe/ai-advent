'use client';

import React from 'react';

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
        rounded-xl
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
        ${
          isUnlocked
            ? 'bg-gradient-to-br from-red-500 to-red-600 cursor-pointer shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:shadow-2xl hover:brightness-110 active:scale-105'
            : 'bg-gray-600 opacity-60 cursor-not-allowed shadow-md transition-all duration-300'
        }
      `}
      style={{
        transform: isUnlocked ? 'translateZ(0)' : undefined,
      }}
      aria-label={`Door ${day}, ${isUnlocked ? 'unlocked, click to open' : 'locked until December ' + day}`}
      aria-disabled={!isUnlocked}
      tabIndex={0}
    >
      {/* Day Number */}
      <span
        className={`
          text-4xl
          md:text-5xl
          font-bold
          ${isUnlocked ? 'text-white' : 'text-gray-400'}
          transition-all
          duration-300
          will-change-transform
        `}
        style={{
          transform: 'translateZ(0)',
        }}
      >
        {day}
      </span>

      {/* Lock Icon - Only shown when locked */}
      {!isUnlocked && (
        <div className="absolute top-2 right-2 transition-opacity duration-300 will-change-transform" style={{ transform: 'translateZ(0)' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      )}

      {/* Unlocked Indicator - Sparkle effect */}
      {isUnlocked && (
        <div className="absolute top-2 right-2 animate-door-unlock will-change-transform" style={{ transform: 'translateZ(0)' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-300 animate-pulse will-change-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ transform: 'translateZ(0)' }}
          >
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
          </svg>
        </div>
      )}

      {/* Hover hint for unlocked doors */}
      {isUnlocked && (
        <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 will-change-transform" style={{ transform: 'translateZ(0)' }}>
          Click to open
        </span>
      )}
    </button>
  );
}
