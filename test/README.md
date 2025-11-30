# Testing Setup

This directory contains test configuration and setup files for the Advent Calendar application.

## Testing Framework

- **Vitest**: Fast unit test framework with jsdom environment
- **fast-check**: Property-based testing library
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom matchers for DOM assertions

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

- `setup.ts`: Global test setup and configuration
- `setup.test.ts`: Verification tests for the testing environment
- Component tests should be co-located with components using `.test.tsx` suffix
- Property-based tests should run a minimum of 100 iterations

## Property-Based Testing

Each property-based test must:
1. Run at least 100 iterations
2. Be tagged with a comment referencing the design document property
3. Use the format: `**Feature: advent-calendar, Property {number}: {property_text}**`

Example:
```typescript
// **Feature: advent-calendar, Property 1: Door unlock date logic**
fc.assert(
  fc.property(fc.integer({ min: 1, max: 24 }), fc.date(), (day, date) => {
    // Test implementation
  }),
  { numRuns: 100 }
);
```
