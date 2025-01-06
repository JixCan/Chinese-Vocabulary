import type { Character } from '../types';

export function getRandomCharacter(characters: Character[], excludeId?: string): Character {
  const availableCharacters = excludeId
    ? characters.filter(char => char.id !== excludeId)
    : characters;
  return availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
}

export function getRandomOptions(characters: Character[], currentCharacter: Character): string[] {
  const options = [currentCharacter.translation];
  const otherCharacters = characters.filter(char => char.id !== currentCharacter.id);
  
  while (options.length < 4 && otherCharacters.length > 0) {
    const randomIndex = Math.floor(Math.random() * otherCharacters.length);
    const option = otherCharacters[randomIndex].translation;
    if (!options.includes(option)) {
      options.push(option);
    }
    otherCharacters.splice(randomIndex, 1);
  }

  return shuffleArray(options);
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}