import { isValidYear } from '../../utils/dateHelpers';

const DateInput = ({ userGuess, setUserGuess, onSubmit }) => {
  const handleStartYearChange = (e) => {
    const year = parseInt(e.target.value) || null;
    setUserGuess(prev => ({ 
      ...prev, 
      startYear: year
    }));
  };

  const handleEndYearChange = (e) => {
    const year = parseInt(e.target.value) || null;
    setUserGuess(prev => ({ 
      ...prev, 
      endYear: year
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const isFormValid = userGuess.startYear && userGuess.endYear && 
                     isValidYear(userGuess.startYear) && isValidYear(userGuess.endYear);

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="text-lg font-semibold mb-6 text-center">
        Enter your guess for the start and end years
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div>
          <label htmlFor="startYear" className="block text-sm font-medium text-gray-700 mb-2">
            Start Year
          </label>
          <input
            type="number"
            id="startYear"
            value={userGuess.startYear || ''}
            onChange={handleStartYearChange}
            className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            min="-10000"
            max="2024"
            placeholder="e.g., 1914 or -4500 for 4500 BCE"
            required
          />
        </div>
        
        <div>
          <label htmlFor="endYear" className="block text-sm font-medium text-gray-700 mb-2">
            End Year
          </label>
          <input
            type="number"
            id="endYear"
            value={userGuess.endYear || ''}
            onChange={handleEndYearChange}
            className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            min="-10000"
            max="2024"
            placeholder="e.g., 1918 or -1900 for 1900 BCE"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`btn-primary px-8 py-3 text-lg ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Submit Guess
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>💡 Tip: Consider both the start and end years carefully.</p>
        <p>Use negative numbers for BCE years (e.g., -500 for 500 BCE)</p>
        <p>Your score depends on how close your guess is to the actual timeline!</p>
      </div>
    </form>
  );
};

export default DateInput;