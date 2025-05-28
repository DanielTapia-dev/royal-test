const express = require('express');
const { getSquare } = require('./controllers/square.controller');
require('./worker/double.worker');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/square/:num', getSquare);

app.listen(PORT, () => {
  console.log(`Service-B listening on http://localhost:${PORT}`);
});
