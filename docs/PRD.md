# TimeTester -- A Historical Timeline Game
## Project Requirements Document (PRD)

**Objective**:
Develop a modern, standalone mobile-first app that helps players learn the start, end dates, and durations of major historical events through interactive guessing and scoring.

**Core Features**:

1. **Event Database**:

   * A collection of 100+ historical events with names, start dates, and end dates. (stored in Supabase)
   * Examples: World War I (1914–1918), Roman Empire, etc.

2. **Gameplay Mechanics**:

   * Players guess the start and end dates for each event.
   * The game calculates how far off their guess is from the actual dates and assigns a score based on accuracy.

3. **Scoring System**:

   * Penalties for incorrect start and end dates, with a heavier penalty for larger errors.
   * The duration should match -- meaning if an event lasted 10 years, then the player who guesses 11 years is better than someone who thought it lasted 50 years.
   * A visual indicator showing how close the guess was to the real timeline.
     * Two durations shown on 2 horizontal timelines -- the actual and the player's guess.
     * Color-coded for how close or far off the two timespans are.

4. **User Interface**:

   * Built with React for interactivity.
   * Styling and responsive design using Tailwind CSS.
   * Use the Playwright MCP to improve the design.


**Technical Stack**:

* **Frontend**: React, Tailwind CSS
* **Backend**: Could be a simple Node.js backend or even a static JSON file if data is fixed.
* **Deployment**: Any modern hosting (e.g., Vercel, Netlify).

