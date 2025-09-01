const EventCard = ({ event, eventNumber, totalEvents }) => {
  return (
    <div className="card mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-2">
            Event {eventNumber} of {totalEvents}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {event.name}
          </h2>
          <p className="text-gray-600 mb-4">
            {event.description}
          </p>
          <div className="flex gap-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {event.category}
            </span>
            <span className={`inline-block text-xs px-2 py-1 rounded-full ${
              event.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              event.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {event.difficulty}
            </span>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-lg font-medium">
        When did this event occur?
      </div>
    </div>
  );
};

export default EventCard;