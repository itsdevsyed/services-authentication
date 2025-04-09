import jest from 'jest'
import app from '../../src/app.js'
import supertest from 'supertest'


descibe('Get /api/auth/profile' , () => {
    it('should return user profile', async () => {
        const res = await request(app).get('/api/auth/profile')
        cos
    })
})

