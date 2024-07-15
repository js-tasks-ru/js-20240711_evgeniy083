/**
 * Sum of two numbers
 *
 * @param {number} m first number
 * @param {number} n second number
 * @returns {number}
 */
export const sum = (m, n) => {
  // Проверка типов аргументов
  if (typeof m !== 'number' || typeof n !== 'number') {
    throw new Error('Both arguments must be numbers.');
  }

  // Сложение
  return m + n;
};
