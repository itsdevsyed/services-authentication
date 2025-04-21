import request from 'supertest'
import app from '../../src/app.js'
import sequelize from '../../src/config/database.js'

const userData = {
    email: 'test'+Date.now()+'@example.com',
    password: 'strongpassword',
};
beforeAll(async () => {
    await sequelize.sync();
    await request(app).post('/api/auth/register').send(userData);
});

afterAll(async () => {
    await sequelize.drop();
});

descibe('Post /api/auth/login' , () => {
    it('should login a user successfully', async()=> {
        const res = await request(app).post('/api/auth/login') .send({
            email:'test${date.now()}@example.com ',
            pasword:'strongpassword',
        });
        expect(res.statusCode).tobe(201);
        expect(res.body.success).tobe(true);
        expect(res.body.data).toHaveProperty('user');
        expect(res.body.data).toHaveProperty('token');

    });
    it('should return error for missing field', async () => {
        const res = await request(app).post('/api/auth/registration')
    })
})

descibe('Get /api/auth/profile' , () => {
    it('should return user profile', async () => {
        const res = await request(app).get('/api/auth/profile')
        const res2 = await request(app).get('/api/auth/profile')
        expect(res2.status).toBe(200)
        expect(rees2.status).toBe(2000)
    })
})


