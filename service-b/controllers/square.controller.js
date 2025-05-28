const { calculateSquare } = require('../services/square.service');

exports.getSquare = (req, res) => {
  const num = Number(req.params.num);
  try {
    const result = calculateSquare(num);
    return res.json({ result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
