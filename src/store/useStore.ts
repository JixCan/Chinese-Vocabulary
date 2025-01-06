import { create } from 'zustand';
import { Character } from '../types';
import { loadCharacters, saveCharacters, generateId } from '../lib/storage';

interface DictionaryState {
  characters: Character[];
  darkMode: boolean;
  setCharacters: (characters: Character[]) => void;
  addCharacter: (character: Omit<Character, 'id' | 'created_at'>) => void;
  deleteCharacter: (id: string) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<DictionaryState>((set, get) => ({
  characters: loadCharacters(),
  darkMode: localStorage.getItem('darkMode') === 'true',
  setCharacters: (characters) => {
    set({ characters });
    saveCharacters(characters);
  },
  addCharacter: (characterData) => {
    const character: Character = {
      ...characterData,
      id: generateId(),
      created_at: new Date().toISOString()
    };
    const newCharacters = [...get().characters, character];
    set({ characters: newCharacters });
    saveCharacters(newCharacters);
  },
  deleteCharacter: (id) => {
    const newCharacters = get().characters.filter(char => char.id !== id);
    set({ characters: newCharacters });
    saveCharacters(newCharacters);
  },
  toggleDarkMode: () => {
    const newDarkMode = !get().darkMode;
    localStorage.setItem('darkMode', String(newDarkMode));
    set({ darkMode: newDarkMode });
  },
}));