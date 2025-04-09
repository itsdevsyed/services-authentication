import jest from 'jest'
import app from '../../src/app.js'


descibe('Get /api/auth/profile' , () => {
    it('should return user profile', async () => {
        const res = await request(app).get('/api/auth/profile')
    })
})


