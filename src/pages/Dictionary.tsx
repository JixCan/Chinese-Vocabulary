import { CharacterForm } from '../components/CharacterForm';
import { CharacterList } from '../components/CharacterList';
import { useStore } from '../store/useStore';

export function Dictionary() {
  const { darkMode } = useStore();

  return (
    <div className={`space-y-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div>
        <h2 className="text-2xl font-bold mb-4">Add New Character</h2>
        <CharacterForm />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Character List</h2>
        <CharacterList />
      </div>
    </div>
  );
}