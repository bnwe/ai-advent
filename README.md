# 🎄 AI Advent Calendar

An interactive Advent Calendar web application that brings the magic of December to life. Open a new door each day to discover unique content, from festive messages to beautiful imagery.

## ✨ Features

- **24 Interactive Doors** - One for each day leading up to Christmas
- **Time-Based Unlocking** - Doors automatically unlock on their corresponding date
- **Rich Content** - Each door reveals unique text, images, or both
- **Fully Accessible** - Complete keyboard navigation and screen reader support
- **Responsive Design** - Beautiful experience on desktop, tablet, and mobile
- **Performance Optimized** - Hardware-accelerated animations with reduced motion support
- **Festive Theming** - Gradient backgrounds and smooth animations create a magical atmosphere

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the calendar.

### Environment Setup

Copy `.env.local.example` to `.env.local` if you need to configure environment variables:

```bash
cp .env.local.example .env.local
```

#### Environment Variables

- `NEXT_PUBLIC_TEST_DATE` - Optional ISO date string (YYYY-MM-DD) to simulate a specific date for testing door unlock logic. Useful for testing without waiting for actual dates. Example: `NEXT_PUBLIC_TEST_DATE=2024-12-15`. If empty or invalid, the actual current date is used.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Open Vitest UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 🏗️ Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS v4** - Styling
- **Vitest** - Testing framework

## 📁 Project Structure

```
ai-advent/
├── app/
│   ├── components/     # React components (Calendar, Door, ContentView)
│   ├── data/          # Door content configuration
│   ├── utils/         # Date service and utilities
│   ├── types/         # TypeScript definitions
│   └── styles/        # Theme configuration
├── public/
│   ├── images/        # Door content images
│   └── sounds/        # Audio assets
└── test/              # Test setup and utilities
```

## 🎨 Customization

### Adding Door Content

Edit `app/data/doorContent.ts` to customize what appears behind each door:

```typescript
{
  day: 1,
  title: "Your Title",
  content: "Your message",
  imageUrl: "/images/your-image.jpg"
}
```

### Styling

- Global styles: `app/globals.css`
- Theme configuration: `app/styles/theme.ts`
- Tailwind config: Uses inline `@theme` directive in globals.css

