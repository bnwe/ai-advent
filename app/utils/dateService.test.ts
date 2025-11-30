import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getCurrentDate, isDoorUnlocked, isDecember } from './dateService';

describe('DateService', () => {
  describe('getCurrentDate', () => {
    it('should return a valid Date object', () => {
      const date = getCurrentDate();
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).not.toBeNaN();
    });

    it('should handle invalid system dates by returning safe fallback', () => {
      // getCurrentDate should always return a valid date
      const date = getCurrentDate();
      expect(date).toBeInstanceOf(Date);
      expect(isNaN(date.getTime())).toBe(false);
      
      // The fallback date (if system date is invalid) should be in the past
      // which will cause all doors to be locked (safe default)
      expect(date.getTime()).toBeGreaterThan(0);
    });
  });

  describe('isDecember', () => {
    it('should return true for December dates', () => {
      const decemberDate = new Date(2024, 11, 15); // December 15, 2024
      expect(isDecember(decemberDate)).toBe(true);
    });

    it('should return false for non-December dates', () => {
      const novemberDate = new Date(2024, 10, 30); // November 30, 2024
      expect(isDecember(novemberDate)).toBe(false);
    });

    it('should handle invalid dates', () => {
      const invalidDate = new Date('invalid');
      expect(isDecember(invalidDate)).toBe(false);
    });
  });

  describe('isDoorUnlocked', () => {
    it('should unlock door on its designated December date', () => {
      const dec5 = new Date(2024, 11, 5); // December 5, 2024
      expect(isDoorUnlocked(5, dec5)).toBe(true);
    });

    it('should unlock door after its designated December date', () => {
      const dec10 = new Date(2024, 11, 10); // December 10, 2024
      expect(isDoorUnlocked(5, dec10)).toBe(true);
    });

    it('should keep door locked before its designated December date', () => {
      const dec3 = new Date(2024, 11, 3); // December 3, 2024
      expect(isDoorUnlocked(5, dec3)).toBe(false);
    });

    it('should keep all doors locked in November', () => {
      const nov30 = new Date(2024, 10, 30); // November 30, 2024
      expect(isDoorUnlocked(1, nov30)).toBe(false);
      expect(isDoorUnlocked(24, nov30)).toBe(false);
    });

    it('should unlock all doors in January after December', () => {
      const jan15 = new Date(2025, 0, 15); // January 15, 2025
      expect(isDoorUnlocked(1, jan15)).toBe(true);
      expect(isDoorUnlocked(24, jan15)).toBe(true);
    });

    it('should handle edge case of day 1', () => {
      const dec1 = new Date(2024, 11, 1); // December 1, 2024
      expect(isDoorUnlocked(1, dec1)).toBe(true);
    });

    it('should handle edge case of day 24', () => {
      const dec24 = new Date(2024, 11, 24); // December 24, 2024
      expect(isDoorUnlocked(24, dec24)).toBe(true);
    });

    it('should return false for invalid door numbers', () => {
      const dec15 = new Date(2024, 11, 15);
      expect(isDoorUnlocked(0, dec15)).toBe(false);
      expect(isDoorUnlocked(25, dec15)).toBe(false);
      expect(isDoorUnlocked(-1, dec15)).toBe(false);
      expect(isDoorUnlocked(1.5, dec15)).toBe(false);
    });

    it('should return false for invalid dates', () => {
      const invalidDate = new Date('invalid');
      expect(isDoorUnlocked(5, invalidDate)).toBe(false);
    });

    describe('environment variable override', () => {
      let originalEnv: string | undefined;

      beforeEach(() => {
        // Save original env value
        originalEnv = process.env.NEXT_PUBLIC_DISABLE_DATE_CHECK;
      });

      afterEach(() => {
        // Restore original env value
        if (originalEnv === undefined) {
          delete process.env.NEXT_PUBLIC_DISABLE_DATE_CHECK;
        } else {
          process.env.NEXT_PUBLIC_DISABLE_DATE_CHECK = originalEnv;
        }
      });

      it('should unlock all valid doors when NEXT_PUBLIC_DISABLE_DATE_CHECK is true', () => {
        process.env.NEXT_PUBLIC_DISABLE_DATE_CHECK = 'true';
        
        const nov30 = new Date(2024, 10, 30); // November 30, 2024
        expect(isDoorUnlocked(1, nov30)).toBe(true);
        expect(isDoorUnlocked(5, nov30)).toBe(true);
        expect(isDoorUnlocked(24, nov30)).toBe(true);
      });

      it('should still validate door numbers when override is enabled', () => {
        process.env.NEXT_PUBLIC_DISABLE_DATE_CHECK = 'true';
        
        const dec15 = new Date(2024, 11, 15);
        expect(isDoorUnlocked(0, dec15)).toBe(false);
        expect(isDoorUnlocked(25, dec15)).toBe(false);
        expect(isDoorUnlocked(-1, dec15)).toBe(false);
      });

      it('should use normal date checking when env var is not set', () => {
        delete process.env.NEXT_PUBLIC_DISABLE_DATE_CHECK;
        
        const nov30 = new Date(2024, 10, 30); // November 30, 2024
        expect(isDoorUnlocked(5, nov30)).toBe(false);
      });

      it('should use normal date checking when env var is false', () => {
        process.env.NEXT_PUBLIC_DISABLE_DATE_CHECK = 'false';
        
        const nov30 = new Date(2024, 10, 30); // November 30, 2024
        expect(isDoorUnlocked(5, nov30)).toBe(false);
      });
    });
  });
});
