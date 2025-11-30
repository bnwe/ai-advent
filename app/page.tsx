'use client';

import Calendar from './components/Calendar';
import { DOOR_CONTENTS } from './data/doorContent';

/**
 * Home Page Component
 * 
 * Main entry point for the Advent Calendar application.
 * Renders the Calendar component with hardcoded door content.
 * 
 * Requirements: 1.1, 7.1, 7.2
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
      <main className="container mx-auto">
        <Calendar doors={DOOR_CONTENTS} />
      </main>
    </div>
  );
}
