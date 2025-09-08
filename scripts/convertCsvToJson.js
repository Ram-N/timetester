const fs = require('fs');
const path = require('path');

// Read and parse CSV
const csvPath = path.join(__dirname, '../src/data/dur2.csv');
const jsonPath = path.join(__dirname, '../src/data/historicalEvents.json');

const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n').filter(line => line.trim());

// Manual parsing because of complex CSV structure
const headers = lines[0].split(',').map(h => h.trim());
console.log('Headers found:', headers);

// Parse CSV data with proper column mapping
// Handle the extra column in data vs header by padding headers
const expectedColumns = 33; // Based on manual count
const adjustedHeaders = [...headers];
// Add missing header if data has more columns
if (lines[1] && lines[1].split(',').length > headers.length) {
  adjustedHeaders.push('extraCol');
}

const csvData = lines.slice(1).map((line, index) => {
  const values = line.split(',');
  
  // Ensure we have the right number of columns  
  const row = {};
  adjustedHeaders.forEach((header, i) => {
    row[header] = (values[i] !== undefined) ? values[i].trim() : '';
  });
  
  // Add correct year parsing - fixing column alignment issue
  row._actualStartYear = values[32] ? parseInt(values[32]) : null;
  row._actualEndYear = values[33] ? parseInt(values[33]) : null;
  
  // Debug first few rows
  if (index < 3) {
    console.log(`Row ${index + 1} - Actual years: ${row._actualStartYear} to ${row._actualEndYear}`);
  }
  
  return row;
}).filter(row => row && row.eventID !== ''); // Remove empty rows

console.log(`Parsed ${csvData.length} events from CSV`);

// Read existing JSON
const existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const existingEvents = existingData.events;
const maxExistingId = Math.max(...existingEvents.map(e => e.id));

// Region and theme column mappings
const regionColumns = ['America', 'Europe', 'Asia', 'Africa', 'China', 'Britain', 'France', 'Greek', 'India', 'MiddleEast', 'Russia'];
const themeColumns = ['Wars', 'Religion', 'Science', 'Discovery', 'Invention', 'Royalty', 'World', 'prehistory'];

// Convert CSV events to new schema
const convertedEvents = csvData.map((row, index) => {
  const id = maxExistingId + parseInt(row.eventID) + 1;
  
  // Use the correctly parsed years from the CSV processing
  const startYear = row._actualStartYear;
  const endYear = row._actualEndYear;
  
  if (isNaN(startYear) || isNaN(endYear) || startYear === null || endYear === null) {
    console.log(`Warning: Invalid years for event ${row.event}: start=${startYear}, end=${endYear}`);
    return null;
  }
  
  // Extract regions and themes based on boolean values
  const regions = regionColumns.filter(col => row[col] === '1');
  const themes = themeColumns.filter(col => row[col] === '1');
  
  // Determine primary category from themes
  let primaryCategory = 'Historical';
  if (themes.includes('Wars')) primaryCategory = 'Wars';
  else if (themes.includes('Religion')) primaryCategory = 'Religion';
  else if (themes.includes('Science')) primaryCategory = 'Science';
  else if (themes.includes('Discovery')) primaryCategory = 'Discovery';
  else if (themes.includes('Invention')) primaryCategory = 'Invention';
  else if (themes.includes('Royalty')) primaryCategory = 'Royalty';
  
  // Map numeric difficulty to legacy system
  const difficultyLevel = parseInt(row.itemDifficulty) || 5;
  let legacyDifficulty = 'medium';
  if (difficultyLevel <= 3) legacyDifficulty = 'easy';
  else if (difficultyLevel >= 8) legacyDifficulty = 'hard';
  
  // Create backward-compatible date strings
  const formatDateString = (year) => {
    if (year < 0) {
      return `${Math.abs(year).toString().padStart(4, '0')}-01-01 BC`;
    } else if (year < 10) {
      return `000${year}-01-01`;
    } else if (year < 100) {
      return `00${year}-01-01`;
    } else if (year < 1000) {
      return `0${year}-01-01`;
    } else {
      return `${year}-01-01`;
    }
  };
  
  return {
    id,
    name: row.event || 'Unknown Event',
    startDate: formatDateString(startYear),   // Backward compatibility
    endDate: formatDateString(endYear),       // Backward compatibility
    startYear,                                // New year-only format
    endYear,                                  // New year-only format
    category: primaryCategory,                // Backward compatibility
    difficulty: legacyDifficulty,            // Backward compatibility
    difficultyLevel,                         // New fine-grained difficulty
    regions,                                 // New regions array
    themes,                                  // New themes array
    description: row.details || `Historical event: ${row.event}`,
    wikipediaLink: row.wikipedia || null,
    mnemonic: row.mnemonic || null,
    duration: row.Duration ? parseInt(row.Duration) : Math.abs(endYear - startYear)
  };
}).filter(event => event !== null);

console.log(`Successfully converted ${convertedEvents.length} events`);

// Merge with existing events
const mergedData = {
  events: [...existingEvents, ...convertedEvents]
};

// Write merged data
fs.writeFileSync(jsonPath, JSON.stringify(mergedData, null, 2));

console.log(`✅ Successfully converted ${convertedEvents.length} events from CSV`);
console.log(`📊 Total events in JSON: ${mergedData.events.length}`);
console.log(`🆔 New event IDs: ${maxExistingId + 1} to ${maxExistingId + convertedEvents.length}`);

// Generate detailed summary
console.log('\n📈 Sample converted events:');
convertedEvents.slice(0, 3).forEach(event => {
  console.log(`- ${event.name} (${event.startYear} to ${event.endYear})`);
  console.log(`  Regions: [${event.regions.join(', ')}]`);
  console.log(`  Themes: [${event.themes.join(', ')}]`);
  console.log(`  Difficulty: ${event.difficultyLevel}/10 (${event.difficulty})`);
  console.log('');
});

// Category and region stats
const categoryStats = {};
const regionStats = {};
const difficultyStats = {};

convertedEvents.forEach(event => {
  categoryStats[event.category] = (categoryStats[event.category] || 0) + 1;
  event.regions.forEach(region => {
    regionStats[region] = (regionStats[region] || 0) + 1;
  });
  difficultyStats[event.difficultyLevel] = (difficultyStats[event.difficultyLevel] || 0) + 1;
});

console.log('\n📊 Conversion Statistics:');
console.log('Categories:', categoryStats);
console.log('Top Regions:', Object.entries(regionStats).sort(([,a], [,b]) => b - a).slice(0, 5));
console.log('Difficulty Distribution:', difficultyStats);