import type { Character } from '../types';

export function saveCharacters(characters: Character[]): void {
  localStorage.setItem('characters', JSON.stringify(characters));
}

export function loadCharacters(): Character[] {
  const data = localStorage.getItem('characters');
  return data ? JSON.parse(data) : [];
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}