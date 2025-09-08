const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../src/data/historicalEvents.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Category to region/theme mapping for original events
const categoryMappings = {
  'War': {
    themes: ['Wars', 'World'],
    regions: ['Europe', 'America'] // Most wars in original set are European/American
  },
  'Empire': {
    themes: ['Royalty', 'World'],
    regions: ['Europe', 'Africa', 'Asia'] // Empires span multiple regions
  },
  'Political': {
    themes: ['World'],
    regions: ['America', 'Europe', 'Russia']
  },
  'Cultural': {
    themes: ['World'],
    regions: ['Europe']
  },
  'Economic': {
    themes: ['World'],
    regions: ['America', 'Europe']
  },
  'Technological': {
    themes: ['Science', 'Invention', 'World'],
    regions: ['America', 'Europe']
  },
  'Exploration': {
    themes: ['Discovery', 'World'],
    regions: ['Europe', 'America']
  },
  'Pandemic': {
    themes: ['World'],
    regions: ['Europe', 'Africa', 'Asia']
  }
};

// Difficulty mapping
const difficultyMap = {
  'easy': 2,
  'medium': 5,
  'hard': 8
};

// Extract year from date string
const extractYear = (dateString) => {
  const year = parseInt(dateString.split('-')[0]);
  return year;
};

// Convert original 15 events (IDs 1-15)
const convertedEvents = data.events.map(event => {
  if (event.id <= 15) {
    // This is an original event, convert it
    const startYear = extractYear(event.startDate);
    const endYear = extractYear(event.endDate);
    const categoryMapping = categoryMappings[event.category] || { themes: ['World'], regions: ['Europe'] };
    
    return {
      id: event.id,
      name: event.name,
      startDate: event.startDate, // Keep for backward compatibility initially
      endDate: event.endDate,     // Keep for backward compatibility initially
      startYear,                  // New year format
      endYear,                    // New year format
      category: event.category,   // Keep for backward compatibility
      difficulty: event.difficulty, // Keep for backward compatibility
      difficultyLevel: difficultyMap[event.difficulty] || 5, // New fine-grained difficulty
      regions: categoryMapping.regions, // New regions array
      themes: categoryMapping.themes,   // New themes array
      description: event.description,
      wikipediaLink: null,       // No Wikipedia links for original events
      mnemonic: null,           // No mnemonics for original events
      duration: Math.abs(endYear - startYear) // Calculate duration
    };
  } else {
    // This is a new event, keep as-is
    return event;
  }
});

// Write updated data
const updatedData = {
  events: convertedEvents
};

fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 2));

console.log('✅ Successfully converted original 15 events to unified format');
console.log('📊 All 65 events now use consistent schema');

// Show sample conversions
console.log('\n📈 Sample conversions:');
convertedEvents.slice(0, 3).forEach(event => {
  console.log(`- ${event.name} (${event.startYear} to ${event.endYear})`);
  console.log(`  Regions: [${event.regions.join(', ')}]`);
  console.log(`  Themes: [${event.themes.join(', ')}]`);
  console.log(`  Difficulty: ${event.difficultyLevel}/10 (${event.difficulty})`);
  console.log('');
});

// Validate all events have required fields
const missingFields = convertedEvents.filter(event => 
  event.startYear === undefined || 
  event.endYear === undefined || 
  !event.regions || 
  !event.themes ||
  event.difficultyLevel === undefined
);

if (missingFields.length === 0) {
  console.log('✅ All events have required unified format fields');
} else {
  console.log('⚠️  Events missing fields:', missingFields.map(e => e.id));
}