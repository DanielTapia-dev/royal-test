exports.calculateSquare = (num) => {
  if (isNaN(num)) {
    throw new Error('Invalid number');
  }
  return num * num;
};
