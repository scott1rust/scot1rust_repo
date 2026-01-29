'use client';

interface HeaderProps {
  activeTab: 'book' | 'sessions';
  onTabChange: (tab: 'book' | 'sessions') => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:h-20 gap-4 sm:gap-0">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="/blazin_paddles_logo.png" 
              alt="Blazin' Paddles" 
              className="h-12 sm:h-16 md:h-20 w-auto"
            />
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex space-x-2 w-full sm:w-auto">
            <button
              onClick={() => onTabChange('book')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'book'
                  ? 'bg-[#ff6b35] text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Book a Court
            </button>
            <button
              onClick={() => onTabChange('sessions')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'sessions'
                  ? 'bg-[#ff6b35] text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Sessions
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
