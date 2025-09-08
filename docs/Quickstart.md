# TimeTester - Developer Quickstart

Welcome to TimeTester! This guide will get you up and running quickly with the historical timeline guessing game.

## Prerequisites

- Node.js 18+ 
- npm (comes with Node.js)

## Quick Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd timetester
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will open at http://localhost:3000

## Available Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

## Testing New Functionality

Since there's no formal test suite, follow these manual testing steps:

### Game Flow Testing
1. Start a new game and verify event displays correctly
2. Test date input validation (invalid dates, future dates)
3. Submit guesses and check scoring calculations
4. Verify timeline visualization shows both actual and guessed dates
5. Test game progression through all events
6. Check final score display and restart functionality

### Adding New Events
1. Edit `src/data/historicalEvents.json`
2. Follow the required schema:
   ```json
   {
     "id": number,
     "name": "Event Name",
     "startDate": "YYYY-MM-DD",
     "endDate": "YYYY-MM-DD", 
     "category": "Wars|Science|Politics|Culture",
     "difficulty": "easy|medium|hard",
     "description": "Brief description"
   }
   ```
3. Test the new event in gameplay

### Mobile Testing
- Test on various screen sizes using browser dev tools
- Verify touch interactions work properly
- Check responsive layout breakpoints

## Key Architecture

- **Game State**: Managed by `useGame` hook in `src/hooks/useGame.js`
- **Scoring**: Exponential decay algorithm in `src/utils/scoring.js`
- **Components**: 
  - `GameBoard` - Main orchestrator
  - `EventCard` - Event display
  - `DateInput` - User input handling
  - `ScoreDisplay` - Results with timeline
- **Data**: Historical events in `src/data/historicalEvents.json`

## Styling

- Uses Tailwind CSS 3.3.0
- Mobile-first responsive design
- Configuration in `tailwind.config.js`

## Common Development Tasks

### Adding New Categories
1. Add category to events in JSON data
2. Update category styling in `EventCard.jsx`
3. Test category display and filtering

### Modifying Scoring
1. Edit scoring algorithm in `src/utils/scoring.js`
2. Test with various date differences
3. Verify score display updates correctly

### UI Changes
1. Components are in `src/components/`
2. Use existing Tailwind classes for consistency
3. Test responsive behavior on mobile

## Troubleshooting

- **Port conflicts**: Change port in `vite.config.js`
- **Build issues**: Ensure all imports use explicit `.jsx`/`.js` extensions
- **Styling issues**: Check Tailwind classes are correctly applied

For more details, see the full project documentation in `CLAUDE.md`.