// Simplified scoring system - all events now use unified year format
export const calculateScore = (actual, guess) => {
  // All events now have startYear/endYear fields
  const startDiff = Math.abs(actual.startYear - guess.startYear);
  const endDiff = Math.abs(actual.endYear - guess.endYear);
  
  // Calculate actual and guessed durations
  const actualDuration = Math.abs(actual.endYear - actual.startYear);
  const guessDuration = Math.abs(guess.endYear - guess.startYear);
  const durationDiff = Math.abs(actualDuration - guessDuration);
  
  // Scoring formula (lower is better)
  const startPenalty = Math.pow(startDiff, 1.2);
  const endPenalty = Math.pow(endDiff, 1.2);
  const durationPenalty = Math.pow(durationDiff, 1.1);
  
  // Total penalty (higher = worse)
  const totalPenalty = startPenalty + endPenalty + (durationPenalty * 0.5);
  
  // Convert to score (100 = perfect, lower = worse)
  const score = Math.max(0, Math.round(100 * Math.exp(-totalPenalty / 10)));
  
  return {
    score,
    startDiff: Math.round(startDiff * 10) / 10,
    endDiff: Math.round(endDiff * 10) / 10,
    durationDiff: Math.round(durationDiff * 10) / 10,
    actualDuration,
    guessedDuration: guessDuration
  };
};

export const getAccuracyLevel = (yearsDiff) => {
  if (yearsDiff <= 1) return 'excellent';
  if (yearsDiff <= 5) return 'good';
  if (yearsDiff <= 20) return 'fair';
  return 'poor';
};

export const getAccuracyColor = (level) => {
  const colors = {
    excellent: 'bg-green-500',
    good: 'bg-yellow-500', 
    fair: 'bg-orange-500',
    poor: 'bg-red-500'
  };
  return colors[level] || 'bg-gray-500';
};