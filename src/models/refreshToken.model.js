import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.model.js'; // assuming user model is here

const RefreshToken = sequelize.define('RefreshToken', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  revoked_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'refresh_tokens',
  timestamps: true,
  underscored: true // this will match snake_case in DB like `user_id`, `expires_at`
});

// Associate with user (optional but good practice)
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

export default RefreshToken;
