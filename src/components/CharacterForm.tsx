import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getCharacterInfo } from '../lib/api';

export function CharacterForm() {
  const { darkMode, addCharacter } = useStore();
  const [chinese, setChinese] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChineseChange = async (value: string) => {
    setChinese(value);
    if (value.length > 0) {
      const info = await getCharacterInfo(value);
      setPinyin(info.pinyin); // Обновляем всегда
      setTranslation(info.translation); // Обновляем всегда
    } else {
      setPinyin(''); // Сбрасываем, если поле пустое
      setTranslation(''); // Сбрасываем, если поле пустое
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chinese || !pinyin || !translation) return;

    setLoading(true);
    try {
      addCharacter({ chinese, pinyin, translation });
      setChinese('');
      setPinyin('');
      setTranslation('');
    } catch (error) {
      console.error('Error adding character:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label 
            htmlFor="chinese" 
            className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
          >
            Chinese Character
          </label>
          <input
            type="text"
            id="chinese"
            value={chinese}
            onChange={(e) => handleChineseChange(e.target.value)}
            className={`mt-1 block w-full rounded-md ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } shadow-sm focus:ring-primary-500 focus:border-primary-500`}
            required
          />
        </div>
        <div>
          <label 
            htmlFor="pinyin" 
            className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
          >
            Pinyin
          </label>
          <input
            type="text"
            id="pinyin"
            value={pinyin}
            onChange={(e) => setPinyin(e.target.value)}
            className={`mt-1 block w-full rounded-md ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } shadow-sm focus:ring-primary-500 focus:border-primary-500`}
            required
          />
        </div>
        <div>
          <label 
            htmlFor="translation" 
            className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
          >
            Translation
          </label>
          <input
            type="text"
            id="translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className={`mt-1 block w-full rounded-md ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } shadow-sm focus:ring-primary-500 focus:border-primary-500`}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center px-4 py-2 rounded-md ${
            darkMode 
              ? 'bg-primary-600 hover:bg-primary-700 text-white' 
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          } disabled:opacity-50`}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Character
        </button>
      </div>
    </form>
  );
}