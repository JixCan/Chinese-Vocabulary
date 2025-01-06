import React, { useState } from 'react';
import { Search, Download, Upload, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { exportCharacters, importCharacters } from '../lib/api';
import type { Character } from '../types';

export function CharacterList() {
  const { darkMode, characters, setCharacters, deleteCharacter } = useStore();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<keyof Character>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await importCharacters(file);
      setCharacters([...characters, ...imported]);
    } catch (error) {
      console.error('Error importing characters:', error);
    }
  };

  const filteredCharacters = characters.filter(char => 
    char.chinese.includes(search) ||
    char.pinyin.toLowerCase().includes(search.toLowerCase()) ||
    char.translation.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === 'asc' 
      ? aValue > bValue ? 1 : -1
      : aValue < bValue ? 1 : -1;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search characters..."
            className={`pl-10 w-full rounded-md ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } shadow-sm focus:ring-primary-500 focus:border-primary-500`}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportCharacters(characters)}
            className={`inline-flex items-center px-4 py-2 rounded-md ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-700'
            } border border-gray-300`}
          >
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
          <label className={`inline-flex items-center px-4 py-2 rounded-md cursor-pointer ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-white hover:bg-gray-50 text-gray-700'
            } border border-gray-300`}
          >
            <Upload className="w-5 h-5 mr-2" />
            Import
            <input
              type="file"
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className={`overflow-x-auto rounded-lg border ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              {(['chinese', 'pinyin', 'translation', 'created_at'] as const).map((field) => (
                <th
                  key={field}
                  onClick={() => {
                    if (sortField === field) {
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortField(field);
                      setSortDirection('asc');
                    }
                  }}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                  {sortField === field && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            darkMode 
              ? 'bg-gray-900 divide-gray-700 text-gray-300' 
              : 'bg-white divide-gray-200 text-gray-900'
          }`}>
            {filteredCharacters.map((char) => (
              <tr key={char.id}>
                <td className="px-6 py-4 whitespace-nowrap">{char.chinese}</td>
                <td className="px-6 py-4 whitespace-nowrap">{char.pinyin}</td>
                <td className="px-6 py-4 whitespace-nowrap">{char.translation}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(char.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => deleteCharacter(char.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}