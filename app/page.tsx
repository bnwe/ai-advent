'use client';

import Calendar from './components/Calendar';
import Snow from './components/Snow';
import RetroDecorations from './components/RetroDecorations';
import { DOOR_CONTENTS } from './data/doorContent';

/**
 * Home Page Component
 * 
 * Main entry point for the Advent Calendar application.
 * Renders the Calendar component with hardcoded door content.
 * Features retro gaming aesthetics inspired by Super Tux.
 * 
 * Requirements: 1.1, 7.1, 7.2
 */
export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0e27 0%, #16213e 50%, #1a1a2e 100%)',
      }}>
      {/* Animated snow effect */}
      <Snow />
      
      {/* Retro gaming decorations */}
      <RetroDecorations />
      
      {/* Starry background effect */}
      <div className="fixed inset-0 opacity-30 pointer-events-none" 
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(2px 2px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 90%, white, transparent)
          `,
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
        }}
      />
      
      {/* Ice/snow ground effect at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(184, 230, 245, 0.3) 0%, transparent 100%)',
        }}
      />
      
      <main className="container mx-auto relative z-10">
        <Calendar doors={DOOR_CONTENTS} />
      </main>
    </div>
  );
}
