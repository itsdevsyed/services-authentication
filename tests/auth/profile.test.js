<<<<<<< HEAD
=======
import jest from 'jest'
import app from '../../src/app.js'
import supertest from 'supertest'

const request = supertest(app)

descibe('Get /api/auth/profile' , () => {
    it('should return user profile', async () => {
        const res = await request.get('/api/auth/profile')
        const res2 = await request.get('/api/auth/profile')
        expect(res2.status).toBe(200)
    })
})

descibe('Get /api/auth/profile' , () => {
    it('should return user profile', async () => {
        const res = await request(app).get('/api/auth/profile')
        const res2 = await request(app).get('/api/auth/profile')
        expect(res2.status).toBe(200)
    })
})

g

>>>>>>> d00b7a1a85fde05949cf709d1c1db4094da1a555
