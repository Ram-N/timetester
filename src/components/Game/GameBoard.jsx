import { useGame } from '../../hooks/useGame';
import EventCard from './EventCard';
import DateInput from './DateInput';
import ScoreDisplay from './ScoreDisplay';

const GameBoard = () => {
  const {
    currentEvent,
    currentEventIndex,
    totalEvents,
    gameState,
    userGuess,
    setUserGuess,
    results,
    totalScore,
    averageScore,
    isLastEvent,
    submitGuess,
    nextEvent,
    startNewGame
  } = useGame();

  const currentResult = results[results.length - 1];

  if (gameState === 'finished') {
    return (
      <div className="card text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🎊 Game Complete!</h2>
        
        <div className="mb-6">
          <div className="text-5xl font-bold text-primary-600 mb-2">{averageScore}/100</div>
          <div className="text-xl text-gray-600">Average Score</div>
          <div className="text-gray-500 mt-2">
            Total Points: {totalScore} / {totalEvents * 100}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {results.filter(r => r.score >= 80).length}
              </div>
              <div className="text-gray-600">Excellent (80+)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {results.filter(r => r.score >= 50 && r.score < 80).length}
              </div>
              <div className="text-gray-600">Good (50-79)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {results.filter(r => r.score < 50).length}
              </div>
              <div className="text-gray-600">Needs Work (&lt;50)</div>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
          <h4 className="font-semibold text-gray-900">Event Breakdown:</h4>
          {results.map((result, index) => (
            <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">{result.event.name}</span>
              <span className={`font-semibold ${
                result.score >= 80 ? 'text-green-600' :
                result.score >= 50 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {result.score}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={startNewGame}
          className="btn-primary px-8 py-3 text-lg"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Progress: {currentEventIndex + 1} / {totalEvents}
            </div>
            <div className="text-sm font-medium text-gray-700">
              Average Score: {averageScore}/100
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentEventIndex + (gameState === 'results' ? 1 : 0)) / totalEvents) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <EventCard 
        event={currentEvent} 
        eventNumber={currentEventIndex + 1}
        totalEvents={totalEvents}
      />

      {gameState === 'playing' && (
        <DateInput
          userGuess={userGuess}
          setUserGuess={setUserGuess}
          onSubmit={submitGuess}
        />
      )}

      {gameState === 'results' && currentResult && (
        <ScoreDisplay
          result={currentResult}
          onNext={nextEvent}
          isLastEvent={isLastEvent}
        />
      )}
    </div>
  );
};

export default GameBoard;