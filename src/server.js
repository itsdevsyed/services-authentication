import sequelize from '../config/database.js';
import User from './user.model.js';
import RefreshToken from './refreshToken.model.js';

const initializeDatabase = async () => {
  try {
    // Sync models, creating necessary tables
    await sequelize.sync({ alter: true });
    console.log('Database synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

// Invoke the initialization function
initializeDatabase();

export { sequelize, User, RefreshToken };
