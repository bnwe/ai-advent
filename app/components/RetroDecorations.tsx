'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * RetroDecorations Component
 * Adds retro gaming-style decorations like Tux, coins, and sparkles
 * Inspired by Super Tux and classic platformer games
 */
export default function RetroDecorations() {
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    top: number;
    left: number;
    animationDelay: number;
  }>>([]);

  useEffect(() => {
    // Generate random sparkles
    const newSparkles = Array.from({ length: 30 }, (_, i) => ({
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

      {/* Floating Tux penguins - top corners */}
      <div className="absolute top-10 left-10 retro-star w-20 h-20" style={{ filter: 'drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.5))' }}>
        <Image src="/images/tux.png" alt="" width={80} height={80} className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-10 right-10 retro-star w-20 h-20" style={{ animationDelay: '0.5s', filter: 'drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.5))' }}>
        <Image src="/images/tux.png" alt="" width={80} height={80} className="w-full h-full object-cover" />
      </div>
      
      {/* More Tux penguins scattered around */}
      <div className="absolute top-1/2 left-10 retro-star w-16 h-16" style={{ animationDelay: '1s', filter: 'drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.5))' }}>
        <Image src="/images/tux.png" alt="" width={64} height={64} className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-1/2 right-10 retro-star w-16 h-16" style={{ animationDelay: '1.5s', filter: 'drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.5))' }}>
        <Image src="/images/tux.png" alt="" width={64} height={64} className="w-full h-full object-cover" />
      </div>
      
      {/* Floating coins */}
      <div className="absolute top-1/4 left-20 retro-coin text-yellow-400 text-3xl" style={{ animationDelay: '0.3s' }}>
        🪙
      </div>
      <div className="absolute top-1/3 right-20 retro-coin text-yellow-400 text-3xl" style={{ animationDelay: '0.8s' }}>
        🪙
      </div>
      
      {/* Christmas trees */}
      <div className="absolute bottom-20 left-10 text-green-400 text-5xl" style={{ animation: 'float 4s ease-in-out infinite' }}>
        🎄
      </div>
      <div className="absolute bottom-20 right-10 text-green-400 text-5xl" style={{ animation: 'float 3.5s ease-in-out infinite', animationDelay: '0.5s' }}>
        🎄
      </div>
      
      {/* Presents */}
      <div className="absolute bottom-32 left-1/4 text-4xl" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.2s' }}>
        🎁
      </div>
      <div className="absolute bottom-32 right-1/4 text-4xl" style={{ animation: 'float 3.2s ease-in-out infinite', animationDelay: '0.7s' }}>
        🎁
      </div>
    </div>
  );
}
