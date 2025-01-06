
import { Outlet, Link } from 'react-router-dom';
import { Moon, Sun, Book, PenTool, GraduationCap } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Layout() {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`fixed w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-10`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className={`flex items-center px-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Book className="w-6 h-6 mr-2" />
                <span className="font-bold text-lg">Chinese Dictionary</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/dictionary" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <PenTool className="w-5 h-5 mr-1" />
                <span>Dictionary</span>
              </Link>
              <Link 
                to="/practice" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <GraduationCap className="w-5 h-5 mr-1" />
                <span>Practice</span>
              </Link>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}