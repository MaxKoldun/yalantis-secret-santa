const request = require('supertest');
const { app } = require('../index');
const db = require('../models');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

describe('Post Endpoints', () => {
    let thisDb = db;
    
    beforeAll(async () => {
        await thisDb.sequelize.sync({ force: true })
    })

    it('Should create a new user', async () => {
        const newGame = await request(app)
            .post('/api/games')
            .send({ name: 'New game 2021' });

        const testUserBody = { 
            first: 'first',
            last: 'last',
            game_id: newGame.body.id,
            wishes: [ { message : 'Test wish' } ]
        };

        const res = await request(app)
            .post('/api/users')
            .send(testUserBody);

        expect(res.statusCode).toEqual(200);
        expect(res.body.wishes[0].message).toEqual(testUserBody.wishes[0].message);
        expect(res.body.game_id).toBe(testUserBody.game_id);
        expect(res.body.last).toBe(testUserBody.last);
        expect(res.body.first).toBe(testUserBody.first);
    });

    it('Should throw 422 error if input params are not valid', async () => {
        const testUserBody = { 
            first: '',
            last: '',
            game_id: -1,
            wishes: [  ]
        };

        const res = await request(app)
            .post('/api/users')
            .send(testUserBody);

        expect(res.statusCode).toEqual(422);
        expect(res.body.message).toBe('Input parameters are not valid');
        expect(res.body.errors).toEqual({
            first: 'REQUIRED',
            last: 'REQUIRED',
            game_id: 'NOT_POSITIVE_INTEGER',
            wishes: 'TOO_FEW_ITEMS'
        });
    });

    it('Should throw 404 error if game is not found', async () => {
        const testUserBody = { 
            first: 'first',
            last: 'last',
            game_id: 22,
            wishes: [ { message : 'Test wish' } ]
        };
        const res = await request(app)
            .post('/api/users')
            .send(testUserBody);


        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe('Game with the id is not found');
    });

    it('Should throw 403 if users count more then available', async () => {
        const newGame = await request(app)
            .post('/api/games')
            .send({ name: 'New game 2022' });

        const testUserBody = { 
            first: 'first',
            last: 'last',
            game_id: newGame.body.id,
            wishes: [ { message : 'Test wish' } ]
        };

        await thisDb.User.bulkCreate([ ...Array(config.maxUsers) ].map(() => {
            return {
                first: 'first',
                last: 'last',
                game_id: newGame.body.id,
                santa_for_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }));

        const res = await request(app)
            .post('/api/users')
            .send(testUserBody);


        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toBe('Max user quantity is reached for this game, please create a new one');
    });

    afterAll(async () => { 
        await thisDb.sequelize.close()
    });
});