import { Link } from 'react-router-dom';
import { Book, GraduationCap } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Home() {
  const { darkMode } = useStore();

  return (
    <div className={`min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center ${
      darkMode ? 'text-white' : 'text-gray-900'
    }`}>
      <h1 className="text-4xl font-bold mb-8">Welcome to Chinese Dictionary</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Link
          to="/dictionary"
          className={`p-6 rounded-lg shadow-lg ${
            darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
          } transition-colors duration-200`}
        >
          <div className="flex items-center mb-4">
            <Book className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-semibold">Dictionary</h2>
          </div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Add and manage your Chinese characters, with automatic pinyin and translations.
          </p>
        </Link>
        <Link
          to="/practice"
          className={`p-6 rounded-lg shadow-lg ${
            darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
          } transition-colors duration-200`}
        >
          <div className="flex items-center mb-4">
            <GraduationCap className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-semibold">Practice</h2>
          </div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Test your knowledge with various exercises and quizzes.
          </p>
        </Link>
      </div>
    </div>
  );
}