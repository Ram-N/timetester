import { useState, useRef, useCallback, useEffect } from 'react';
import { formatYear } from '../../utils/dateHelpers.js';

const TimelineSlider = ({ startYear, endYear, onYearChange, minYear = -10000, maxYear = 2024 }) => {
  const [isDragging, setIsDragging] = useState(null);
  const [dragStartPosition, setDragStartPosition] = useState(null);
  const [dragStartYear, setDragStartYear] = useState(null);
  const sliderRef = useRef(null);

  // Calculate positions as percentages
  const getPosition = (year) => {
    return ((year - minYear) / (maxYear - minYear)) * 100;
  };

  // Calculate year from position
  const getYearFromPosition = (position) => {
    const year = minYear + (position / 100) * (maxYear - minYear);
    return Math.round(year);
  };

  const getPositionFromEvent = (event) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    // Handle both mouse and touch events
    const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
    return Math.max(0, Math.min(100, (x / rect.width) * 100));
  };

  const handleMouseDown = useCallback((event, handle) => {
    event.preventDefault();
    setIsDragging(handle);
    setDragStartPosition(getPositionFromEvent(event));
    
    // If no value is set, use the default position to calculate initial year
    let initialYear;
    if (handle === 'start') {
      initialYear = startYear || getYearFromPosition(20); // 20% position as default
    } else {
      initialYear = endYear || getYearFromPosition(80); // 80% position as default
    }
    
    setDragStartYear(initialYear);
    
    // Set initial value if not already set
    if ((handle === 'start' && !startYear) || (handle === 'end' && !endYear)) {
      onYearChange(handle, initialYear);
    }
  }, [startYear, endYear, onYearChange]);

  const handleTouchStart = useCallback((event, handle) => {
    event.preventDefault();
    handleMouseDown(event, handle);
  }, [handleMouseDown]);

  const handleMouseMove = useCallback((event) => {
    if (!isDragging || !sliderRef.current) return;

    const currentPosition = getPositionFromEvent(event);
    const positionDiff = currentPosition - dragStartPosition;
    
    // Calculate year difference with enhanced sensitivity for rapid changes
    const baseYearDiff = (positionDiff / 100) * (maxYear - minYear);
    
    // Enhanced rapid dragging: larger movements get exponential scaling
    const absDiff = Math.abs(positionDiff);
    let multiplier = 1;
    
    if (absDiff > 50) {
      // Very fast drag: 5x multiplier for movements > 50%
      multiplier = 5;
    } else if (absDiff > 20) {
      // Fast drag: 3x multiplier for movements > 20%
      multiplier = 3;
    } else if (absDiff > 10) {
      // Medium drag: 2x multiplier for movements > 10%
      multiplier = 2;
    }
    
    const adjustedYearDiff = baseYearDiff * multiplier;
    
    const newYear = Math.round(dragStartYear + adjustedYearDiff);
    const clampedYear = Math.max(minYear, Math.min(maxYear, newYear));

    if (isDragging === 'start') {
      // Ensure start year is at least 1 year before end year
      const maxStartYear = endYear ? Math.min(endYear - 1, clampedYear) : clampedYear;
      onYearChange('start', maxStartYear);
    } else if (isDragging === 'end') {
      // Ensure end year is at least 1 year after start year
      const minEndYear = startYear ? Math.max(startYear + 1, clampedYear) : clampedYear;
      onYearChange('end', minEndYear);
    }
  }, [isDragging, dragStartPosition, dragStartYear, startYear, endYear, minYear, maxYear, onYearChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
    setDragStartPosition(null);
    setDragStartYear(null);
  }, []);

  // Add global mouse and touch event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (event) => handleMouseMove(event);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalMouseMove, { passive: false });
      document.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalMouseMove);
      document.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Always show handles with default positions if no values are set
  const startPos = startYear ? getPosition(startYear) : 20;
  const endPos = endYear ? getPosition(endYear) : 80;
  const width = endPos - startPos;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">Timeline Selector</span>
        <span className="text-xs text-gray-500">
          {startYear && endYear ? `${formatYear(startYear)} - ${formatYear(endYear)}` : 
           startYear || endYear ? `${formatYear(startYear || getYearFromPosition(20))} - ${formatYear(endYear || getYearFromPosition(80))}` :
           'Drag handles to set years'}
        </span>
      </div>
      
      <div 
        ref={sliderRef}
        className="relative h-12 bg-gray-100 rounded-full cursor-pointer select-none"
        style={{ touchAction: 'none' }}
      >
        {/* Timeline track */}
        <div className="absolute inset-y-0 left-0 right-0 bg-gray-200 rounded-full" />
        
        {/* Guiding posts - historical markers */}
        {(() => {
          const markers = [];
          // CE markers: 0, 500, 1000, 1500, 2000
          const ceYears = [0, 500, 1000, 1500, 2000];
          // BCE markers: every 2000 years
          const bceYears = [-2000, -4000, -6000, -8000, -10000];
          
          [...bceYears, ...ceYears].forEach((year) => {
            // Only show markers within our range
            if (year >= minYear && year <= maxYear) {
              const position = getPosition(year);
              markers.push(
                <div
                  key={year}
                  className="absolute top-0 bottom-0 w-px bg-gray-300 opacity-50"
                  style={{ left: `${position}%` }}
                />
              );
            }
          });
          
          return markers;
        })()}
        
        {/* Selected range */}
        {startYear && endYear && (
          <div
            className="absolute h-full bg-purple-400 rounded-full transition-all duration-150"
            style={{
              left: `${startPos}%`,
              width: `${width}%`,
            }}
          />
        )}
        
        {/* Start handle - always visible */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-grab transition-all duration-150 ${
            isDragging === 'start' ? 'bg-green-600 scale-110 cursor-grabbing' : 'bg-green-500 hover:bg-green-600'
          } ${!startYear ? 'opacity-70' : ''}`}
          style={{ 
            left: `${startPos}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: isDragging === 'start' ? 20 : 10
          }}
          onMouseDown={(e) => handleMouseDown(e, 'start')}
          onTouchStart={(e) => handleTouchStart(e, 'start')}
        />
        
        {/* End handle - always visible */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-grab transition-all duration-150 ${
            isDragging === 'end' ? 'bg-red-600 scale-110 cursor-grabbing' : 'bg-red-500 hover:bg-red-600'
          } ${!endYear ? 'opacity-70' : ''}`}
          style={{ 
            left: `${endPos}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: isDragging === 'end' ? 20 : 10
          }}
          onMouseDown={(e) => handleMouseDown(e, 'end')}
          onTouchStart={(e) => handleTouchStart(e, 'end')}
        />
      </div>
      
      {/* Year markers - positioned below in separate container */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">{formatYear(minYear)}</span>
        <span className="text-xs text-gray-500">{formatYear(maxYear)}</span>
      </div>

      {/* Visual feedback */}
      {isDragging && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            <span className="animate-pulse mr-2">🎯</span>
            {isDragging === 'start' ? 'Adjusting start year...' : 'Adjusting end year...'}
          </div>
        </div>
      )}
      
      {/* Tips */}
      <div className="mt-3 text-xs text-gray-500 text-center">
        💡 Drag fast for rapid year changes • Green handle = Start • Red handle = End
      </div>
    </div>
  );
};

export default TimelineSlider;