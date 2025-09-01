import { useState, useEffect } from 'react';
import { calculateScore } from '../utils/scoring.js';
import eventsData from '../data/historicalEvents.json';

export const useGame = () => {
  const [events] = useState(eventsData.events);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'results', 'finished'
  const [userGuess, setUserGuess] = useState({ startDate: '', endDate: '' });
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  const currentEvent = events[currentEventIndex];
  const isLastEvent = currentEventIndex === events.length - 1;

  const submitGuess = () => {
    if (!userGuess.startDate || !userGuess.endDate) {
      alert('Please enter both start and end dates');
      return;
    }

    const result = calculateScore(currentEvent, userGuess);
    const newResult = {
      event: currentEvent,
      guess: { ...userGuess },
      ...result
    };

    setResults(prev => [...prev, newResult]);
    setTotalScore(prev => prev + result.score);
    setGameState('results');
  };

  const nextEvent = () => {
    if (isLastEvent) {
      setGameState('finished');
    } else {
      setCurrentEventIndex(prev => prev + 1);
      setUserGuess({ startDate: '', endDate: '' });
      setGameState('playing');
    }
  };

  const resetGame = () => {
    setCurrentEventIndex(0);
    setGameState('playing');
    setUserGuess({ startDate: '', endDate: '' });
    setResults([]);
    setTotalScore(0);
  };

  const shuffleEvents = () => {
    // Fisher-Yates shuffle
    const shuffled = [...events];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startNewGame = () => {
    const shuffledEvents = shuffleEvents();
    setCurrentEventIndex(0);
    setGameState('playing');
    setUserGuess({ startDate: '', endDate: '' });
    setResults([]);
    setTotalScore(0);
    // In a full implementation, you'd update the events array here
  };

  return {
    currentEvent,
    currentEventIndex,
    totalEvents: events.length,
    gameState,
    userGuess,
    setUserGuess,
    results,
    totalScore,
    isLastEvent,
    submitGuess,
    nextEvent,
    resetGame,
    startNewGame,
    averageScore: results.length > 0 ? Math.round(totalScore / results.length) : 0
  };
};