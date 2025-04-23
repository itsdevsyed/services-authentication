import express from 'express';
import sequelize from './config/database.js';

// Import models (so Sequelize knows about them)
import './models/user.model.js';
import './models/emailVerification.model.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB authenticated');
    await sequelize.sync({ alter: true });
    console.log('DB synced');
  } catch (err) {
    console.error('DB connection or sync error:', err);
    process.exit(1);
  }

  const app = express();
  app.use(express.json());
  // ... your routes, error handlers, etc.
  app.listen(3000, () => console.log('Server running on port 3000'));
})();
