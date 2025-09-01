import { formatDate } from '../../utils/dateHelpers';
import { getAccuracyLevel, getAccuracyColor } from '../../utils/scoring';
import TimelineVisualization from '../Timeline/TimelineVisualization';

const ScoreDisplay = ({ result, onNext, isLastEvent }) => {
  const { event, guess, score, startDiff, endDiff, durationDiff, actualDuration, guessedDuration } = result;
  
  const startAccuracy = getAccuracyLevel(startDiff);
  const endAccuracy = getAccuracyLevel(endDiff);
  
  return (
    <div className="card">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Results</h3>
        <div className="text-4xl font-bold text-primary-600 mb-2">{score}/100</div>
        <div className="text-gray-600">
          {score >= 90 ? '🎉 Excellent!' :
           score >= 70 ? '👍 Great job!' :
           score >= 50 ? '👌 Not bad!' :
           '💪 Keep trying!'}
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">{event.name}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-gray-700 mb-1">Your Guess:</div>
              <div className="text-gray-600">
                {formatDate(new Date(guess.startDate))} - {formatDate(new Date(guess.endDate))}
              </div>
              <div className="text-gray-500">
                Duration: ~{Math.round(guessedDuration)} years
              </div>
            </div>
            
            <div>
              <div className="font-medium text-gray-700 mb-1">Actual:</div>
              <div className="text-gray-600">
                {formatDate(new Date(event.startDate))} - {formatDate(new Date(event.endDate))}
              </div>
              <div className="text-gray-500">
                Duration: ~{Math.round(actualDuration)} years
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700 mb-1">Start Date Accuracy</div>
            <div className={`inline-block w-3 h-3 rounded-full mr-2 ${getAccuracyColor(startAccuracy)}`}></div>
            <div className="text-sm text-gray-600">
              {startDiff === 0 ? 'Perfect!' : `±${startDiff} years`}
            </div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700 mb-1">End Date Accuracy</div>
            <div className={`inline-block w-3 h-3 rounded-full mr-2 ${getAccuracyColor(endAccuracy)}`}></div>
            <div className="text-sm text-gray-600">
              {endDiff === 0 ? 'Perfect!' : `±${endDiff} years`}
            </div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700 mb-1">Duration Accuracy</div>
            <div className={`inline-block w-3 h-3 rounded-full mr-2 ${getAccuracyColor(getAccuracyLevel(durationDiff))}`}></div>
            <div className="text-sm text-gray-600">
              {durationDiff === 0 ? 'Perfect!' : `±${durationDiff} years`}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <TimelineVisualization
          actual={event}
          guess={guess}
          result={result}
        />
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="btn-primary px-8 py-3 text-lg"
        >
          {isLastEvent ? 'View Final Results' : 'Next Event'}
        </button>
      </div>
    </div>
  );
};

export default ScoreDisplay;