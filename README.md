# TimeTester - Historical Timeline Game

A modern, mobile-first React application that helps players learn the start, end dates, and durations of major historical events through interactive guessing and scoring.

## Features

- 🎯 **Interactive Guessing**: Guess start and end dates for historical events
- 📊 **Smart Scoring**: Sophisticated scoring system that considers date accuracy and duration matching
- 📱 **Mobile-First**: Responsive design optimized for mobile devices
- 🎨 **Visual Timeline**: Color-coded timeline comparisons showing accuracy
- 🏆 **Progress Tracking**: Track your performance across multiple events
- 📚 **Rich Event Database**: 15+ historical events with varying difficulty levels

## Game Mechanics

- Players guess both start and end dates for historical events
- Scoring considers:
  - Accuracy of start date (lower penalty for closer guesses)
  - Accuracy of end date (lower penalty for closer guesses)
  - Duration matching (how close your guessed duration is to actual duration)
- Visual feedback with color-coded timeline comparisons
- Performance tracking with final results summary

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS 3
- **Data**: Static JSON (no database required)
- **Build Tool**: Vite
- **Deployment Ready**: Static site generation for easy hosting

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:3000`

## Project Structure

```
timetester/
├── src/
│   ├── components/
│   │   ├── Game/           # Game interface components
│   │   └── Timeline/       # Timeline visualization
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions (scoring, date helpers)
│   ├── data/               # Historical events JSON data
│   └── App.jsx             # Main application component
├── public/                 # Static assets
└── docs/                   # Documentation
```

## Event Data Structure

Events are stored in `src/data/historicalEvents.json` with the following structure:

```json
{
  "id": 1,
  "name": "World War I",
  "startDate": "1914-07-28",
  "endDate": "1918-11-11",
  "category": "War",
  "difficulty": "easy",
  "description": "The Great War that involved most of the world's powers"
}
```

## Scoring Algorithm

The scoring system uses an exponential decay function that considers:

1. **Start Date Error**: Years difference between guess and actual start date
2. **End Date Error**: Years difference between guess and actual end date  
3. **Duration Error**: Difference between guessed duration and actual duration

Perfect score (100) for exact matches, with graceful degradation for larger errors.

## Mobile Optimization

- Touch-friendly button sizes (44px minimum)
- Responsive grid layouts
- Optimized typography scaling
- Sticky header for easy navigation
- Touch gesture support

## Deployment

The application builds to static files and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

## Contributing

Feel free to contribute by:
- Adding more historical events to the database
- Improving the scoring algorithm
- Enhancing the UI/UX
- Adding new features

## License

MIT License - feel free to use this project for learning or personal use.