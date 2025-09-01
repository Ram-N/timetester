# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TimeTester is a React-based historical timeline guessing game where players estimate start and end dates for historical events. The game uses a sophisticated scoring system that considers date accuracy and duration matching, with visual timeline comparisons.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build
npm run preview
```

## Architecture & Key Concepts

### Game State Management
The entire game state is managed through the `useGame` hook (`src/hooks/useGame.js`), which handles:
- Game progression through three states: 'playing' → 'results' → 'finished'
- Event cycling with current event index tracking
- Score calculation and results accumulation
- User guess validation and storage

### Scoring Algorithm
The scoring system (`src/utils/scoring.js`) uses exponential decay with three penalty components:
- Start date penalty: `Math.pow(startDiff.years, 1.2)`
- End date penalty: `Math.pow(endDiff.years, 1.2)`  
- Duration penalty: `Math.pow(durationDiff, 1.1) * 0.5`
- Final score: `100 * Math.exp(-totalPenalty / 10)`

This rewards accuracy for both individual dates and overall duration matching.

### Component Architecture
- **GameBoard**: Main orchestrator that switches between EventCard, DateInput, and ScoreDisplay
- **EventCard**: Displays event information with category/difficulty badges
- **DateInput**: Handles user input with validation
- **ScoreDisplay**: Shows results with integrated TimelineVisualization
- **TimelineVisualization**: Color-coded dual timeline comparison

### Data Structure
Events are stored in `src/data/historicalEvents.json` with schema:
```json
{
  "id": number,
  "name": string,
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD", 
  "category": string,
  "difficulty": "easy|medium|hard",
  "description": string
}
```

### Mobile-First Design
- Uses Tailwind CSS with responsive breakpoints (sm:, md:)
- Touch-friendly button sizes (44px minimum height)
- Sticky header with `z-10` stacking
- Responsive grid layouts that collapse on mobile

## Important Implementation Notes

### Date Handling
All date calculations use the `dateHelpers.js` utility functions. Historical dates can include BCE years (represented as negative years in Date objects).

### Version Constraints
The project uses legacy versions compatible with Node.js 18:
- React 18.2.0 (not React 19)
- Vite 4.5.0 (not 5.x+)
- Tailwind CSS 3.3.0 (not 4.x)

### Build Configuration
- Uses CommonJS modules for Tailwind and PostCSS configs (not ES modules)
- Vite config includes React plugin with port 3000 and auto-open
- Static JSON import for events data (no dynamic loading)

### Component Import Patterns
All imports use explicit `.jsx` and `.js` extensions for compatibility with the build system.