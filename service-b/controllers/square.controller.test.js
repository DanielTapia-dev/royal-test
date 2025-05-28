const request = require('supertest');
const express = require('express');
const { getSquare } = require('../controllers/square.controller');

const app = express();
app.get('/square/:num', getSquare);

describe('GET /square/:num', () => {
  it('should return 200 and correct result', async () => {
    const res = await request(app).get('/square/5');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ result: 25 });
  });

  it('should return 400 for invalid input', async () => {
    const res = await request(app).get('/square/abc');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid number' });
  });
});
