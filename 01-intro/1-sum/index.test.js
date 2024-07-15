import { sum } from './index.js';

describe('intro/sum', () => {
  it('should return sum of numbers', () => {
    expect(sum(1, 1)).toEqual(2);
  });
  it('should return sum of numbers', () => {
    expect(sum(2, 5)).toEqual(7);
  });
  it('should throw an error if either argument is not a number', () => {
    expect(() => sum(1, 'a')).toThrow('Both arguments must be numbers.');
    expect(() => sum('a', 1)).toThrow('Both arguments must be numbers.');
  });
});
