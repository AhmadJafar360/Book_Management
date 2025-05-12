const request = require('supertest');
const app = require('../app'); // Pastikan app.js meng-export Express instance

describe('Auth', () => {
  it('harus berhasil register user baru', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'tester', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('harus berhasil login dan mendapatkan token', async () => {
    await request(app).post('/api/auth/register').send({ username: 'tester', password: '123456' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'tester', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
