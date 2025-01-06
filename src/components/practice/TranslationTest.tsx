import React, { useState} from 'react';
import { useStore } from '../../store/useStore';
import { getRandomCharacter } from '../../utils/practiceUtils';

export function TranslationTest() {
  const { darkMode, characters } = useStore();
  const [currentCharacter, setCurrentCharacter] = useState(getRandomCharacter(characters));
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = answer.trim().toLowerCase() === currentCharacter.chinese.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    setCurrentCharacter(getRandomCharacter(characters, currentCharacter.id));
    setAnswer('');
    setShowResult(false);
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h2 className="text-2xl font-bold mb-6">Translation Test</h2>
      <div className="mb-6">
        <p className="text-lg mb-2">Translate to Chinese:</p>
        <p className="text-xl font-bold">{currentCharacter.translation}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={showResult}
            className={`w-full p-2 rounded-md ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Enter Chinese character"
          />
        </div>
        
        {showResult ? (
          <div className="space-y-4">
            <div className={`p-4 rounded-md ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${currentCharacter.chinese}`}
            </div>
            <button
              onClick={handleNext}
              className={`w-full p-2 rounded-md ${
                darkMode 
                  ? 'bg-primary-600 hover:bg-primary-700' 
                  : 'bg-primary-500 hover:bg-primary-600'
              } text-white`}
            >
              Next Character
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className={`w-full p-2 rounded-md ${
              darkMode 
                ? 'bg-primary-600 hover:bg-primary-700' 
                : 'bg-primary-500 hover:bg-primary-600'
            } text-white`}
          >
            Check Answer
          </button>
        )}
      </form>
    </div>
  );
}