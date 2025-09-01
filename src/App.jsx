import GameBoard from './components/Game/GameBoard'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            TimeTester
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Test your knowledge of historical timelines
          </p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-4 sm:py-8 pb-safe">
        <GameBoard />
      </main>
    </div>
  )
}

export default App