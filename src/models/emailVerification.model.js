// src/models/emailVerification.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.model.js';

const EmailVerification = sequelize.define('EmailVerification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  tableName: 'email_verifications',
  timestamps: true,
  underscored: true,
});

export default EmailVerification;
