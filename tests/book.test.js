const request = require('supertest');
const app = require('../app');
const Book = require('../models/Book');
const Author = require('../models/Author');

let token;
let authorId;

beforeEach(async () => {
  // Register dan login untuk dapatkan token
  await request(app).post('/api/auth/register').send({ username: 'test', password: '123456' });
  const res = await request(app).post('/api/auth/login').send({ username: 'test', password: '123456' });
  token = res.body.token;

  // Tambah penulis dulu
  const authorRes = await request(app)
    .post('/api/authors')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Author 1', bio: 'Bio author' });

  authorId = authorRes.body._id;
});

describe('Book', () => {
  it('harus bisa menambahkan buku', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Buku Test', description: 'Deskripsi Buku', author: authorId });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Buku Test');
  });

  it('harus bisa mengambil daftar buku (GET)', async () => {
    await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Buku Test', description: 'Deskripsi Buku', author: authorId });

    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
