import sequelize from '../config/database.js';
import User from './user.model.js';
import RefreshToken from './refreshToken.model.js';
import EmailVerification from './emailVerification.model.js';

// Define Associations
User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
  as: 'refreshTokens',
  onDelete: 'CASCADE',
});

User.hasOne(EmailVerification, {
  foreignKey: 'user_id',
  as: 'emailVerification',
  onDelete: 'CASCADE',
});



export { sequelize, User, RefreshToken };
