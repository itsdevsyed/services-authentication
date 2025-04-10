import jest from 'jest'
import app from '../../src/app.js'
import supertest from 'supertest'


descibe('Get /api/auth/profile' , () => {
    it('should return user profile', async () => {
        const res = await request(app).get('/api/auth/profile')
        const res2 = await request(app).get('/api/auth/profile')
        expect(res2.status).toBe(200)
    })
})

g
