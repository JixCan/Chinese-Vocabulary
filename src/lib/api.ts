// import fs from 'fs/promises';

// interface UnicodeInfo {
//   [key: string]: string | undefined;
// }

// interface UnicodeMap {
//   [key: string]: UnicodeInfo;
// }

export async function getCharacterInfo(chinese: string): Promise<{ pinyin: string; translation: string }> {
  try {
    // Загрузить файл
    const response = await fetch('/characters.txt');
    const fileContent = await response.text();

    const lines = fileContent.split('\n');
    const unicodeMap: Record<string, Record<string, string>> = {};
    let currentUnicode: string | null = null;

    // Парсинг файла
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('#') || trimmedLine === '') continue;

      const [key, type, ...valueParts] = trimmedLine.split(/\s+/);
      const value = valueParts.join(' ');

      if (key.startsWith('U+')) {
        currentUnicode = key;
        if (!unicodeMap[currentUnicode]) {
          unicodeMap[currentUnicode] = {};
        }
        unicodeMap[currentUnicode][type] = value;
      } else if (currentUnicode) {
        unicodeMap[currentUnicode][type] = value;
      }
    }

    // Обработка иероглифа/иероглифов
    if (chinese.length === 1) {
      const unicode = `U+${chinese.charCodeAt(0).toString(16).toUpperCase()}`;
      const info = unicodeMap[unicode] || {};
      return {
        pinyin: info.kMandarin || '',
        translation: info.kDefinition || '',
      };
    } else {
      const pinyinArray: string[] = [];
      for (const char of chinese) {
        const unicode = `U+${char.charCodeAt(0).toString(16).toUpperCase()}`;
        const info = unicodeMap[unicode] || {};
        if (info.kMandarin) {
          pinyinArray.push(info.kMandarin);
        }
      }
      return {
        pinyin: pinyinArray.join(' '),
        translation: '',
      };
    }
  } catch (error) {
    console.error('Error processing character info:', error);
    return { pinyin: '', translation: '' };
  }
}




export function exportCharacters(characters: any[]) {
  const blob = new Blob([JSON.stringify(characters, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chinese-dictionary-export.json';
  a.click();
  URL.revokeObjectURL(url);
}

export async function importCharacters(file: File) {
  const text = await file.text();
  return JSON.parse(text);
}