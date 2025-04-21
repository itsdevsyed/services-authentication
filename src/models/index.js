import sequelize from '../config/database.js';
import User from './user.model.js';
import RefreshToken from './refreshToken.model.js';

// Define Associations
User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
  as: 'refreshTokens',
  onDelete: 'CASCADE',
});

RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});
await sequelize.sync({ alter: true });


export { sequelize, User, RefreshToken };
