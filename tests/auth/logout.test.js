import request from 'supertest';
import app from '../app';

let validToken; // Variable to store the valid token

// Sample user credentials for login
const testData = {
  email: 'testuser@example.com',
  password: 'TestPassword123',
};

beforeAll(async () => {
  // First, perform login to get a valid token
  const response = await request(app)
    .post('/api/login')
    .send({
      email: testData.email,
      password: testData.password,
    });

  // Save the token to use in the logout test
  validToken = response.body.token;
});

describe('Logout User', () => {
  it('should logout successfully when user is logged in', async () => {
    // Use the valid token from login for logout
    const response = await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should fail logout when token is not provided', async () => {
    const response = await request(app).post('/api/logout');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
