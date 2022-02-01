const request = require('supertest');
const { app } = require('../index');
const db = require('../models');

describe('Post Endpoints', () => {
    let thisDb = db;
    
    beforeAll(async () => {
        await thisDb.sequelize.sync({ force: true })
    })
    
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
    await request(app).post('/api/games').send({ name: 'New game 2021' })
    const res = await request(app).post('/api/games').send({ name: 'New game 2021' })

    console.log(res.body)
    expect(res.body.errors[0].message).toBe('name must be unique');
  });

    afterAll(async () => { 
        await thisDb.sequelize.close()
    });
});