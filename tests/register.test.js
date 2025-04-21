const request = require('supertest');
const app = require('../src/app'); // adjust path if your app is in a different folder
const { sequelize } = require('../src/config/db'); // or however you export Sequelize instance
const User = require('../src/models/user.model');

// Helper to clear user if exists (so test is always repeatable)
const TEST_EMAIL = 'testuser@example.com';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset DB (optional in dev)
});

afterAll(async () => {
  await User.destroy({ where: { email: TEST_EMAIL } }); // Clean up after test
  await sequelize.close(); // Close DB connection
});

describe('POST /api/auth/register', () => {
  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: TEST_EMAIL,
        password: 'testpass123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(TEST_EMAIL);
  });

  test('should return error for duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User 2',
        email: TEST_EMAIL, // same email as above
        password: 'anotherpass123'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('User already exists');
  });
});
