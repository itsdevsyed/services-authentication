import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.model.js'; // Make sure this path is correct

const RefreshToken = sequelize.define('RefreshToken', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Optional: helps avoid duplicate tokens
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  revoked_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'refresh_tokens',
  timestamps: true,
  underscored: true, // snake_case fields like `user_id`
});

// Association
RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // Optional: if you want to auto-delete tokens when a user is deleted
});

export default RefreshToken;
