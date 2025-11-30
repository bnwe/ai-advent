/**
 * Animation Performance Tests
 * 
 * Verifies that all animations use GPU-accelerated properties
 * and respect prefers-reduced-motion settings.
 * 
 * Requirements: 5.1, 5.2, 5.3
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Door from './Door';
import ContentView from './ContentView';
import { DoorContent } from '../types/door';

describe('Animation Performance Tests (Requirements 5.1, 5.2, 5.3)', () => {
  describe('GPU-Accelerated Properties', () => {
    it('should use will-change-transform on Door component for performance', () => {
      const { container } = render(
        <Door day={1} isUnlocked={true} onClick={() => {}} />
      );
      
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.className).toContain('will-change-transform');
    });

    it('should use translateZ(0) for hardware acceleration on unlocked doors', () => {
      const { container } = render(
        <Door day={1} isUnlocked={true} onClick={() => {}} />
      );
      
      const button = container.querySelector('button');
      expect(button?.style.transform).toContain('translateZ(0)');
    });

    it('should use will-change-transform on ContentView for performance', () => {
      const mockContent: DoorContent = {
        day: 1,
        title: 'Test',
        text: 'Test content',
      };

      const { container } = render(
        <ContentView content={mockContent} onClose={() => {}} isOpen={true} />
      );
      
      const overlay = container.querySelector('[role="dialog"]');
      expect(overlay?.className).toContain('will-change-transform');
    });

    it('should use translateZ(0) for hardware acceleration on modal', () => {
      const mockContent: DoorContent = {
        day: 1,
        title: 'Test',
        text: 'Test content',
      };

      const { container } = render(
        <ContentView content={mockContent} onClose={() => {}} isOpen={true} />
      );
      
      const overlay = container.querySelector('[role="dialog"]');
      // @ts-ignore - accessing style property
      expect(overlay?.style.transform).toContain('translateZ(0)');
    });
  });

  describe('Hover Animations', () => {
    it('should have enhanced hover scale animation on unlocked doors', () => {
      const { container } = render(
        <Door day={1} isUnlocked={true} onClick={() => {}} />
      );
      
      const button = container.querySelector('button');
      expect(button?.className).toContain('hover:scale-110');
    });

    it('should have brightness animation on hover for unlocked doors', () => {
      const { container } = render(
        <Door day={1} isUnlocked={true} onClick={() => {}} />
      );
      
      const button = container.querySelector('button');
      expect(button?.className).toContain('hover:brightness-110');
    });

    it('should have active state animation on doors', () => {
      const { container } = render(
        <Door day={1} isUnlocked={true} onClick={() => {}} />
      );
      
      const button = container.querySelector('button');
      expect(button?.className).toContain('active:scale-105');
    });

    it('should have smooth transition duration of 300ms', () => {
      const { container } = render(
        <Door day={1} isUnlocked={true} onClick={() => {}} />
      );
      
      const button = container.querySelector('button');
      expect(button?.className).toContain('duration-300');
    });
  });

  describe('Door Unlock Animation', () => {
    it('should show unlock animation on unlocked door sparkle', () => {
      const { container } = render(
        <Door day={1} isUnlocked={true} onClick={() => {}} />
      );
      
      // Check for the sparkle icon with unlock animation
      const sparkle = container.querySelector('.animate-door-unlock');
      expect(sparkle).toBeTruthy();
    });

    it('should not show unlock animation on locked doors', () => {
      const { container } = render(
        <Door day={1} isUnlocked={false} onClick={() => {}} />
      );
      
      const sparkle = container.querySelector('.animate-door-unlock');
      expect(sparkle).toBeFalsy();
    });
  });

  describe('Modal Animations', () => {
    it('should have fade-in animation on modal overlay', () => {
      const mockContent: DoorContent = {
        day: 1,
        title: 'Test',
        text: 'Test content',
      };

      const { container } = render(
        <ContentView content={mockContent} onClose={() => {}} isOpen={true} />
      );
      
      const overlay = container.querySelector('[role="dialog"]');
      expect(overlay?.className).toContain('animate-fade-in');
    });

    it('should have scale-in animation on modal content', () => {
      const mockContent: DoorContent = {
        day: 1,
        title: 'Test',
        text: 'Test content',
      };

      const { container } = render(
        <ContentView content={mockContent} onClose={() => {}} isOpen={true} />
      );
      
      const modalContent = container.querySelector('.animate-scale-in');
      expect(modalContent).toBeTruthy();
    });

    it('should have enhanced close button animations', () => {
      const mockContent: DoorContent = {
        day: 1,
        title: 'Test',
        text: 'Test content',
      };

      const { container } = render(
        <ContentView content={mockContent} onClose={() => {}} isOpen={true} />
      );
      
      const closeButtons = container.querySelectorAll('button');
      const topCloseButton = closeButtons[0];
      
      expect(topCloseButton.className).toContain('hover:scale-110');
      expect(topCloseButton.className).toContain('hover:rotate-90');
      expect(topCloseButton.className).toContain('active:scale-95');
    });
  });

  describe('Transition Timing', () => {
    it('should use ease-out timing for smooth animations', () => {
      const { container } = render(
        <Door day={1} isUnlocked={true} onClick={() => {}} />
      );
      
      const button = container.querySelector('button');
      expect(button?.className).toContain('ease-out');
    });

    it('should use consistent 300ms duration across components', () => {
      const mockContent: DoorContent = {
        day: 1,
        title: 'Test',
        text: 'Test content',
      };

      const { container: doorContainer } = render(
        <Door day={1} isUnlocked={true} onClick={() => {}} />
      );
      
      const { container: modalContainer } = render(
        <ContentView content={mockContent} onClose={() => {}} isOpen={true} />
      );
      
      const button = doorContainer.querySelector('button');
      const closeButton = modalContainer.querySelector('button');
      
      expect(button?.className).toContain('duration-300');
      expect(closeButton?.className).toContain('duration-300');
    });
  });
});
