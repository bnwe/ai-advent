'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Door from './Door';
import ContentView from './ContentView';
import { DoorContent } from '../types/door';
import { getCurrentDate, isDoorUnlocked } from '../utils/dateService';

interface CalendarProps {
  doors: DoorContent[];
}

/**
 * Calendar Component
 * 
 * Main component that renders the advent calendar with 24 doors in a responsive grid.
 * Manages the state of which door is currently selected and determines lock status
 * for each door based on the current date.
 * 
 * Requirements: 1.1, 1.2, 1.4, 1.5, 2.1, 2.2, 2.3, 3.1, 4.5
 */
export default function Calendar({ doors }: Readonly<CalendarProps>) {
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const currentDate = getCurrentDate();
  const savedScrollPosition = useRef<number>(0);
  const lastClickTime = useRef<number>(0);
  const DEBOUNCE_DELAY = 300; // milliseconds

  /**
   * Handles door click events with debouncing.
   * Opens content view if door is unlocked, provides feedback if locked.
   * Captures scroll position before opening content view.
   * Prevents multiple content views from opening simultaneously.
   * 
   * Requirements: 2.1, 4.5, 6.1
   * 
   * @param day - The day number of the clicked door
   */
  const handleDoorClick = useCallback((day: number) => {
    // Debounce: prevent rapid clicking
    const now = Date.now();
    if (now - lastClickTime.current < DEBOUNCE_DELAY) {
      return;
    }
    lastClickTime.current = now;

    // Prevent multiple content views from opening simultaneously
    if (isModalOpen) {
      return;
    }

    const isUnlocked = isDoorUnlocked(day, currentDate);
    
    if (isUnlocked) {
      // Capture current scroll position before opening modal
      savedScrollPosition.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      
      // Open content view for unlocked door
      setSelectedDoor(day);
      setIsModalOpen(true);
    } else {
      // Provide visual feedback for locked door
      // The Door component already handles the disabled state and cursor
      // Additional feedback could be added here (e.g., shake animation, toast message)
      console.log(`Door ${day} is locked until December ${day}`);
    }
  }, [currentDate, isModalOpen]);

  /**
   * Closes the content view and returns to main calendar view.
   * Restores the scroll position that was saved before opening the modal.
   * 
   * Requirements: 4.5
   */
  const handleCloseContent = useCallback(() => {
    setIsModalOpen(false);
    setSelectedDoor(null);
    
    // Restore scroll position after a brief delay to allow modal to close
    // This ensures the DOM has updated before scrolling
    requestAnimationFrame(() => {
      window.scrollTo({
        top: savedScrollPosition.current,
        behavior: 'instant' as ScrollBehavior
      });
    });
  }, []);

  // Sort doors by day number to ensure correct order
  const sortedDoors = [...doors].sort((a, b) => a.day - b.day);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 relative z-10">
      {/* Retro Gaming Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-center mb-4 pixel-header text-cyan-300 relative inline-block"
          style={{
            textShadow: '5px 5px 0px rgba(0, 0, 0, 1), -2px -2px 0px rgba(255, 255, 255, 0.4)',
          }}>
          🎄 ADVENTSKALENDER 🎄
        </h1>
        <div className="text-xl sm:text-2xl md:text-3xl font-black text-yellow-300 pixel-header mt-2"
          style={{
            textShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
          }}>
          ★ Weihnachtliche Fun Facts 2025 ★
        </div>
        <div className="flex justify-center items-center gap-6 mt-6">
          <div className="retro-star-simple w-12 h-12">
            <Image src="/images/tux.png" alt="" width={48} height={48} className="w-full h-full object-cover" priority />
          </div>
          <span className="retro-coin-simple text-4xl">🪙</span>
          <div className="retro-star-simple w-12 h-12" style={{ animationDelay: '0.5s' }}>
            <Image src="/images/tux.png" alt="" width={48} height={48} className="w-full h-full object-cover" priority />
          </div>
        </div>
      </div>

      {/* Door Grid - Responsive layout */}
      <div 
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-6 
          gap-4 
          md:gap-6
        "
        role="grid"
        aria-label="Advent calendar with 24 doors"
      >
        {sortedDoors.map((door) => {
          const isUnlocked = isDoorUnlocked(door.day, currentDate);
          
          return (
            <Door
              key={door.day}
              day={door.day}
              isUnlocked={isUnlocked}
              onClick={() => handleDoorClick(door.day)}
            />
          );
        })}
      </div>

      {/* Content View Modal */}
      {selectedDoor !== null && isModalOpen && (() => {
        // Handle missing door content with fallback
        const doorContent = doors.find(d => d.day === selectedDoor);
        
        // If door content is missing, create fallback content
        const contentToDisplay: DoorContent = doorContent || {
          day: selectedDoor,
          title: `Tag ${selectedDoor}`,
          text: 'Entschuldigung, der Inhalt für dieses Türchen ist momentan nicht verfügbar. Bitte versuche es später erneut.',
        };

        return (
          <ContentView
            content={contentToDisplay}
            onClose={handleCloseContent}
            isOpen={true}
          />
        );
      })()}
    </div>
  );
}
