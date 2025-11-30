'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * RetroDecorations Component
 * Adds retro gaming-style decorations like Tux, coins, and sparkles
 * Inspired by Super Tux and classic platformer games
 * Optimized: Reduced sparkles from 30 to 10, simplified animations
 */
export default function RetroDecorations() {
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    top: number;
    left: number;
    animationDelay: number;
  }>>([]);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Don't render sparkles if reduced motion is preferred
    }

    // Generate fewer sparkles for better performance (10 instead of 30)
    const newSparkles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDelay: Math.random() * 2,
    }));
    
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            animationDelay: `${sparkle.animationDelay}s`,
          }}
        />
      ))}

      {/* Floating Tux penguins - top corners only (removed side ones for performance) */}
      <div className="absolute top-10 left-10 retro-star-simple w-20 h-20">
        <Image src="/images/tux.png" alt="" width={80} height={80} className="w-full h-full object-cover" priority />
      </div>
      <div className="absolute top-10 right-10 retro-star-simple w-20 h-20" style={{ animationDelay: '0.5s' }}>
        <Image src="/images/tux.png" alt="" width={80} height={80} className="w-full h-full object-cover" priority />
      </div>
      
      {/* Floating coins */}
      <div className="absolute top-1/4 left-20 retro-coin-simple w-12 h-12" style={{ animationDelay: '0.3s' }}>
        <Image src="/images/coin.png" alt="" width={48} height={48} className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-1/3 right-20 retro-coin-simple w-12 h-12" style={{ animationDelay: '0.8s' }}>
        <Image src="/images/coin.png" alt="" width={48} height={48} className="w-full h-full object-contain" />
      </div>
      
      {/* Christmas trees */}
      <div className="absolute bottom-20 left-10 text-green-400 text-5xl retro-float" style={{ animationDelay: '0s' }}>
        🎄
      </div>
      <div className="absolute bottom-20 right-10 text-green-400 text-5xl retro-float" style={{ animationDelay: '0.5s' }}>
        🎄
      </div>
      
      {/* Presents */}
      <div className="absolute bottom-32 left-1/4 text-4xl retro-float" style={{ animationDelay: '0.2s' }}>
        🎁
      </div>
      <div className="absolute bottom-32 right-1/4 text-4xl retro-float" style={{ animationDelay: '0.7s' }}>
        🎁
      </div>
    </div>
  );
}
