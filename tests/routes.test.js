const request = require('supertest');
const app = require('../index');

describe('Post Endpoints', () => {
  it('Should create a new game', async () => {
    const res = await request(app)
      .post('/api/games')
      .send({ name: 'New game 2021' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('New game 2021');
  });

  it('Should throw 422 error', async () => {
    const res = await request(app)
      .post('/api/games')
      .send({ name: '' });
    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toBe('Input parameters are not valid');
  });

  it('Should catch an error is name is not passed', async () => {
    const res = await request(app)
      .post('/api/games')
      .send({ name: 'New game 2021' })
      .send({ name: 'New game 2021' });
    expect(res.body.errors[0].message).toBe('name must be unique');
  });
});