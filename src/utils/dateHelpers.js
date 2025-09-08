// Simplified date helpers for unified year-only format

// Parse year-only format (supports negative years for BC)
export const parseYear = (year) => {
  if (typeof year === 'number') {
    return year;
  }
  if (typeof year === 'string') {
    return parseInt(year);
  }
  return null;
};

export const isValidYear = (year) => {
  const yearNum = parseInt(year);
  return !isNaN(yearNum) && yearNum >= -10000 && yearNum <= 2024; // Support BC years
};

// Format year for display (handles BC years)
export const formatYear = (year) => {
  if (typeof year !== 'number') return '';
  
  if (year < 0) {
    return `${Math.abs(year)} BCE`;
  } else if (year < 1000) {
    return `${year} CE`;
  } else {
    return year.toString();
  }
};

export const yearToDateString = (year) => {
  return `${year.toString().padStart(4, '0')}-01-01`;
};