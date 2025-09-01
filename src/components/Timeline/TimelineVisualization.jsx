import { formatDate } from '../../utils/dateHelpers';
import { getAccuracyLevel, getAccuracyColor } from '../../utils/scoring';

const TimelineVisualization = ({ actual, guess, result }) => {
  const actualStart = new Date(actual.startDate);
  const actualEnd = new Date(actual.endDate);
  const guessStart = new Date(guess.startDate);
  const guessEnd = new Date(guess.endDate);

  // Calculate the overall timeline range for visualization
  const allDates = [actualStart, actualEnd, guessStart, guessEnd];
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));
  
  // Add padding to the timeline (10% on each side)
  const timeRange = maxDate - minDate;
  const paddedMin = new Date(minDate.getTime() - timeRange * 0.1);
  const paddedMax = new Date(maxDate.getTime() + timeRange * 0.1);
  const paddedRange = paddedMax - paddedMin;

  // Calculate positions as percentages
  const getPosition = (date) => {
    return ((date - paddedMin) / paddedRange) * 100;
  };

  const actualStartPos = getPosition(actualStart);
  const actualEndPos = getPosition(actualEnd);
  const guessStartPos = getPosition(guessStart);
  const guessEndPos = getPosition(guessEnd);

  const actualWidth = actualEndPos - actualStartPos;
  const guessWidth = guessEndPos - guessStartPos;

  const startAccuracy = getAccuracyLevel(result.startDiff);
  const endAccuracy = getAccuracyLevel(result.endDiff);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline Comparison</h3>
      
      <div className="space-y-8">
        {/* Actual Timeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Actual Timeline</span>
            <span className="text-xs text-gray-500">
              {formatDate(actualStart)} - {formatDate(actualEnd)}
            </span>
          </div>
          <div className="relative h-8 bg-gray-100 rounded-full">
            <div
              className="absolute h-full bg-blue-500 rounded-full shadow-sm"
              style={{
                left: `${actualStartPos}%`,
                width: `${actualWidth}%`,
              }}
            />
            <div
              className="absolute top-0 w-3 h-8 bg-blue-700 rounded-full shadow-sm"
              style={{ left: `${actualStartPos - 0.5}%` }}
            />
            <div
              className="absolute top-0 w-3 h-8 bg-blue-700 rounded-full shadow-sm"
              style={{ left: `${actualEndPos - 0.5}%` }}
            />
          </div>
        </div>

        {/* Your Guess Timeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Your Guess</span>
            <span className="text-xs text-gray-500">
              {formatDate(guessStart)} - {formatDate(guessEnd)}
            </span>
          </div>
          <div className="relative h-8 bg-gray-100 rounded-full">
            <div
              className="absolute h-full bg-purple-500 rounded-full shadow-sm"
              style={{
                left: `${guessStartPos}%`,
                width: `${guessWidth}%`,
              }}
            />
            <div
              className={`absolute top-0 w-3 h-8 rounded-full shadow-sm ${getAccuracyColor(startAccuracy)}`}
              style={{ left: `${guessStartPos - 0.5}%` }}
            />
            <div
              className={`absolute top-0 w-3 h-8 rounded-full shadow-sm ${getAccuracyColor(endAccuracy)}`}
              style={{ left: `${guessEndPos - 0.5}%` }}
            />
          </div>
        </div>

        {/* Timeline Scale */}
        <div className="relative h-6">
          <div className="absolute inset-x-0 top-2 h-1 bg-gray-300 rounded-full" />
          <div
            className="absolute top-0 text-xs text-gray-500 transform -translate-x-1/2"
            style={{ left: `${getPosition(paddedMin)}%` }}
          >
            {paddedMin.getFullYear()}
          </div>
          <div
            className="absolute top-0 text-xs text-gray-500 transform -translate-x-1/2"
            style={{ left: `${getPosition(paddedMax)}%` }}
          >
            {paddedMax.getFullYear()}
          </div>
        </div>
      </div>

      {/* Accuracy Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-700 mb-3">Accuracy Legend:</div>
        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Excellent (≤1 year)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>Good (≤5 years)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span>Fair (≤20 years)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Needs work (&gt;20 years)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineVisualization;