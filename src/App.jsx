import GameBoard from './components/Game/GameBoard'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Desktop: Smartphone frame container */}
      <div className="hidden md:flex min-h-screen items-center justify-center p-8 bg-gray-900">
        <div className="relative">
          {/* Phone frame with black border */}
          <div className="bg-black rounded-[2.5rem] p-2 shadow-2xl">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-[2rem] w-[390px] h-[844px] overflow-hidden relative">
              {/* Phone screen content */}
              <div className="h-full flex flex-col">
                <header className="bg-white shadow-sm sticky top-0 z-10">
                  <div className="px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                      TimeTester
                    </h1>
                    <p className="text-gray-600 mt-1 text-sm">
                      Test your knowledge of historical timelines
                    </p>
                  </div>
                </header>
                
                <main className="flex-1 px-4 py-4 overflow-y-auto">
                  <GameBoard />
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Original full-screen layout */}
      <div className="md:hidden min-h-screen">
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
    </div>
  )
}

export default App