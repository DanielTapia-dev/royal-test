const { calculateSquare } = require('../services/square.service');

describe('calculateSquare', () => {
  it('should return square of positive number', () => {
    expect(calculateSquare(3)).toBe(9);
  });

  it('should return square of negative number', () => {
    expect(calculateSquare(-4)).toBe(16);
  });

  it('should throw error for invalid number', () => {
    expect(() => calculateSquare('abc')).toThrow('Invalid number');
  });
});
