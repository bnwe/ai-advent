'use client';

import { DoorContent } from '../types/door';
import { RETRO_THEME } from '../styles/theme';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ContentViewProps {
  content: DoorContent;
  onClose: () => void;
  isOpen: boolean;
}

/**
 * ContentView Component
 * 
 * Displays door content in a modal overlay with:
 * - Overlay backdrop
 * - Door title and text content
 * - Optional image display
 * - Close button
 * - Smooth fade-in/fade-out animations
 * - Retro gaming styling
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4
 */
export default function ContentView({ content, onClose, isOpen }: Readonly<ContentViewProps>) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const bottomCloseButtonRef = useRef<HTMLButtonElement>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  // Reset image error state when content changes
  useEffect(() => {
    setImageError(false);
  }, [content.day]);

  // Handle escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap: focus close button when modal opens and trap focus within modal
  useEffect(() => {
    if (!isOpen) return;

    // Focus the top close button when modal opens
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Implement focus trap
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // If shift+tab on first element, go to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // If tab on last element, go to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 animate-fade-in will-change-transform"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{ transform: 'translateZ(0)' }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-800 rounded-2xl p-8 shadow-2xl animate-scale-in will-change-transform"
        style={{
          backgroundColor: RETRO_THEME.colors.backgroundLight,
          borderRadius: RETRO_THEME.spacing.borderRadiusLarge,
          transform: 'translateZ(0)',
        }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg font-bold text-xl transition-all duration-300 ease-out hover:scale-110 hover:rotate-90 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-400 will-change-transform"
          style={{
            backgroundColor: RETRO_THEME.colors.primary,
            color: RETRO_THEME.colors.text,
            transform: 'translateZ(0)',
          }}
          aria-label="Close content view"
        >
          ✕
        </button>

        {/* Content Container */}
        <div className="space-y-6">
          {/* Title */}
          <h2
            id="modal-title"
            className="text-3xl md:text-4xl font-bold pr-12"
            style={{
              color: RETRO_THEME.colors.accent,
              fontFamily: RETRO_THEME.typography.fontSans,
            }}
          >
            {content.title}
          </h2>

          {/* Image (if provided and not errored) */}
          {content.imageUrl && !imageError && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={content.imageUrl}
                alt={`Day ${content.day} - ${content.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
                onError={() => {
                  // Handle missing images with graceful degradation
                  console.warn(`Failed to load image for day ${content.day}: ${content.imageUrl}`);
                  setImageError(true);
                }}
              />
            </div>
          )}

          {/* Text Content */}
          <div
            className="text-lg md:text-xl leading-relaxed"
            style={{
              color: RETRO_THEME.colors.snow,
              fontFamily: RETRO_THEME.typography.fontSans,
            }}
          >
            {content.text}
          </div>

          {/* Close Button (Bottom) */}
          <div className="flex justify-center pt-4">
            <button
              ref={bottomCloseButtonRef}
              onClick={onClose}
              className="px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 ease-out hover:scale-105 hover:brightness-110 active:scale-95 retro-shadow focus:outline-none focus:ring-4 focus:ring-yellow-400 will-change-transform"
              style={{
                backgroundColor: RETRO_THEME.colors.primary,
                color: RETRO_THEME.colors.text,
                transform: 'translateZ(0)',
              }}
              aria-label="Close content view"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
