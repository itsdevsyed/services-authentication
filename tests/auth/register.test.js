
import request from 'supertest'
import app from '../../src/app.js'

descibe('Post /api/auth/register' , () => {
    it('should register a user successfully', async()=> {
        const res = await request(app).post('/api/auth/register') .send({
            name:'Test User',
            email:'test${date.now()}@example.com ',
            pasword:'strongpassword',
        });
        expect(res.statusCode).tobe(201);
        expect(res.body.success).tobe(true);
        expect(res.body.data).toHaveProperty('user');
        expect(res.body.data).toHaveProperty('token');

    });
    it('should retur rror for misdsing f sdfasdfasdfasdf  ield', async () => {
        const res = await request(app).post('/api/auth/registration')
    })
})




