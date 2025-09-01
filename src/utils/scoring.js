import { getDateDifference, calculateDuration } from './dateHelpers.js';

export const calculateScore = (actual, guess) => {
  const startDiff = getDateDifference(actual.startDate, guess.startDate);
  const endDiff = getDateDifference(actual.endDate, guess.endDate);
  
  // Calculate actual and guessed durations
  const actualDuration = calculateDuration(actual.startDate, actual.endDate);
  const guessDuration = calculateDuration(guess.startDate, guess.endDate);
  
  // Duration accuracy (how close the guessed duration is to actual)
  const durationDiff = Math.abs(actualDuration.years - guessDuration.years);
  
  // Scoring formula (lower is better)
  // Base penalty for date errors (years off)
  const startPenalty = Math.pow(startDiff.years, 1.2);
  const endPenalty = Math.pow(endDiff.years, 1.2);
  const durationPenalty = Math.pow(durationDiff, 1.1);
  
  // Total penalty (higher = worse)
  const totalPenalty = startPenalty + endPenalty + (durationPenalty * 0.5);
  
  // Convert to score (100 = perfect, lower = worse)
  // Use exponential decay for scoring
  const score = Math.max(0, Math.round(100 * Math.exp(-totalPenalty / 10)));
  
  return {
    score,
    startDiff: Math.round(startDiff.years * 10) / 10,
    endDiff: Math.round(endDiff.years * 10) / 10,
    durationDiff: Math.round(durationDiff * 10) / 10,
    actualDuration: actualDuration.years,
    guessedDuration: guessDuration.years
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