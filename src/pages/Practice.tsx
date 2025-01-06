import { useStore } from '../store/useStore';
import { TranslationTest } from '../components/practice/TranslationTest';
import { MultipleChoiceTest } from '../components/practice/MultipleChoiceTest';

export function Practice() {
  const { darkMode, characters } = useStore();

  if (characters.length < 4) {
    return (
      <div className={`text-center py-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <h2 className="text-2xl font-bold mb-4">Not Enough Characters</h2>
        <p>Add at least 4 characters to your dictionary to start practicing.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <TranslationTest />
      <MultipleChoiceTest />
    </div>
  );
}