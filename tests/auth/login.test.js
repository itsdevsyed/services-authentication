import request from 'supertest'
import app from '../../src/app.js'
import { JsonWebTokenError } from 'jsonwebtoken'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { User } from '../../src/models/user.js'
import { createUser } from '../utils.js'
import { createToken } from '../../src/utils/jwt.js'
import { createUserWithToken } from '../utils.js'
import { createUserWithTokenAndRole } from '../utils.js'
import { Role } from '../../src/models/role.js'
    describe('POST /api/auth/
    login', () => {
        it('should login a user successfully', async()=> {
            const user = await createUserWithTokenAndRole();
            const res = await request(app).post('/api/auth/login') .send({
                email:user.email,
                password:user.password,
            });
            expect(res.statusCode).tobe(200);
            expect(res.body.success).tobe(true);
            expect(res.body.data).toHaveProperty('user');



