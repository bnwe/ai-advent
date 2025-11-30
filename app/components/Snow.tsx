'use client';

import { useEffect, useState } from 'react';

/**
 * Snow Component
 * Creates animated falling snowflakes across the screen
 * Inspired by retro gaming aesthetics
 */
export default function Snow() {
  const [snowflakes, setSnowflakes] = useState<Array<{
    id: number;
    left: number;
    animationDuration: number;
    animationDelay: number;
    fontSize: number;
    direction: 'left' | 'right';
  }>>([]);

  useEffect(() => {
    // Generate snowflakes
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 20,
      animationDelay: Math.random() * 10,
      fontSize: 10 + Math.random() * 20,
      direction: Math.random() > 0.5 ? 'left' : 'right' as 'left' | 'right',
    }));
    
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="snow-container" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.fontSize}px`,
            animationName: flake.direction === 'left' ? 'snowfall-left' : 'snowfall',
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}
