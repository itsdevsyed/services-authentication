import jest from 'jest'

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
    })
})

g
