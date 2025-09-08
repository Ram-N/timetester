import { formatYear } from '../../utils/dateHelpers';
import { getAccuracyLevel, getAccuracyColor } from '../../utils/scoring';

const TimelineVisualization = ({ actual, guess, result }) => {
  // Use year-only data directly
  const actualStart = actual.startYear;
  const actualEnd = actual.endYear;
  const guessStart = guess.startYear;
  const guessEnd = guess.endYear;

  // Calculate the overall timeline range for visualization
  const allYears = [actualStart, actualEnd, guessStart, guessEnd];
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  
  // Add padding to the timeline (10% on each side)
  const yearRange = maxYear - minYear;
  const paddedMin = minYear - yearRange * 0.1;
  const paddedMax = maxYear + yearRange * 0.1;
  const paddedRange = paddedMax - paddedMin;

  // Calculate positions as percentages
  const getPosition = (year) => {
    return ((year - paddedMin) / paddedRange) * 100;
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
              {formatYear(actualStart)} - {formatYear(actualEnd)}
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
              {formatYear(guessStart)} - {formatYear(guessEnd)}
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
            {formatYear(Math.round(paddedMin))}
          </div>
          <div
            className="absolute top-0 text-xs text-gray-500 transform -translate-x-1/2"
            style={{ left: `${getPosition(paddedMax)}%` }}
          >
            {formatYear(Math.round(paddedMax))}
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