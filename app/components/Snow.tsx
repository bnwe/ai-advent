'use client';

import { useEffect, useState } from 'react';

/**
 * Snow Component
 * Creates animated falling snowflakes across the screen
 * Inspired by retro gaming aesthetics
 * Optimized: 20 snowflakes on desktop, 2 snowflakes (10%) on mobile for better performance
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
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Don't render snowflakes if reduced motion is preferred
    }

    // Detect mobile devices (screen width < 768px)
    const isMobile = window.innerWidth < 768;
    
    // Use 10% of snowflakes on mobile (2 snowflakes), 20 on desktop
    const snowflakeCount = isMobile ? 2 : 20;
    
    const flakes = Array.from({ length: snowflakeCount }, (_, i) => ({
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
