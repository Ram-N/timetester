import { isValidDate } from '../../utils/dateHelpers';

const DateInput = ({ userGuess, setUserGuess, onSubmit }) => {
  const handleStartDateChange = (e) => {
    setUserGuess(prev => ({ ...prev, startDate: e.target.value }));
  };

  const handleEndDateChange = (e) => {
    setUserGuess(prev => ({ ...prev, endDate: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const isFormValid = userGuess.startDate && userGuess.endDate && 
                     isValidDate(userGuess.startDate) && isValidDate(userGuess.endDate);

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="text-lg font-semibold mb-6 text-center">
        Enter your guess for the start and end dates
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={userGuess.startDate}
            onChange={handleStartDateChange}
            className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            min="0001-01-01"
            max="2024-12-31"
            required
          />
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={userGuess.endDate}
            onChange={handleEndDateChange}
            className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            min="0001-01-01"
            max="2024-12-31"
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
        <p>💡 Tip: Consider both the start and end dates carefully.</p>
        <p>Your score depends on how close your guess is to the actual timeline!</p>
      </div>
    </form>
  );
};

export default DateInput;