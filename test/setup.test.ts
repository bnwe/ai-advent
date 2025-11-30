import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

describe('Test Setup Verification', () => {
  it('should run basic unit tests', () => {
    expect(true).toBe(true);
  });

  it('should support property-based testing with fast-check', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return n + 0 === n;
      }),
      { numRuns: 100 }
    );
  });

  it('should have jsdom environment available', () => {
    expect(typeof window).toBe('object');
    expect(typeof document).toBe('object');
  });
});
