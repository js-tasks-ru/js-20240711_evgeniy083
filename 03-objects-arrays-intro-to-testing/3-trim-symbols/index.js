/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (typeof size === 'undefined') {
    return string;
  }
    
  if (size <= 0) {
    return '';
  }
    
  let result = '';
  let prevChar = '';
  let charCount = 0;
    
  for (let i = 0; i < string.length; i++) {
    const currentChar = string[i];
    
    if (currentChar === prevChar) {
      charCount++;
      if (charCount <= size) {
        result += currentChar;
      }
    } else {
      prevChar = currentChar;
      charCount = 1;
      result += currentChar;
    }
  }
    
  return result;
}
