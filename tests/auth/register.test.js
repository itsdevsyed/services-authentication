import request from 'supertest';
import app from '../app';

const testData = {
  email: 'testuser@example.com',
  password: 'TestPassword123',
};

describe('Login User', () => {
  it('should login successfully with correct credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: testData.email,
        password: testData.password,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it('should fail login with incorrect password', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: testData.email,
        password: 'WrongPassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
