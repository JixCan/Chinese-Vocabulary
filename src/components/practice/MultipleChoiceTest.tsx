import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { getRandomCharacter, getRandomOptions } from '../../utils/practiceUtils';

export function MultipleChoiceTest() {
  const { darkMode, characters } = useStore();
  const [currentCharacter, setCurrentCharacter] = useState(getRandomCharacter(characters));
  const [options, setOptions] = useState(getRandomOptions(characters, currentCharacter));
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleNext = () => {
    const newCharacter = getRandomCharacter(characters, currentCharacter.id);
    setCurrentCharacter(newCharacter);
    setOptions(getRandomOptions(characters, newCharacter));
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h2 className="text-2xl font-bold mb-6">Multiple Choice Test</h2>
      <div className="mb-6">
        <p className="text-lg mb-2">Select the correct translation:</p>
        <p className="text-xl font-bold">{currentCharacter.chinese}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => !showResult && handleAnswer(option)}
            disabled={showResult}
            className={`p-4 rounded-md text-left ${
              showResult
                ? option === currentCharacter.translation
                  ? 'bg-green-100 text-green-800'
                  : option === selectedAnswer
                    ? 'bg-red-100 text-red-800'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <button
          onClick={handleNext}
          className={`w-full mt-6 p-2 rounded-md ${
            darkMode 
              ? 'bg-primary-600 hover:bg-primary-700' 
              : 'bg-primary-500 hover:bg-primary-600'
          } text-white`}
        >
          Next Character
        </button>
      )}
    </div>
  );
}