import Joi from "joi";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/user.model.js';
import RefreshToken from '../../models/refreshToken.model.js';
import crypto from 'crypto';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const login = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = value;

    // Check user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const hashStart = Date.now();
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Bcrypt Verify Time:", Date.now() - hashStart, "ms");

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Generate refresh token
    const refreshToken = crypto.randomBytes(64).toString('hex');
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days expiry

    try {
      // Attempt to create the refresh token
      console.log('Creating refresh token with:', {
        user_id: user.id,
        refreshToken: refreshToken,
        expires_at: refreshExpiresAt
      });

      await RefreshToken.create({
        user_id: user.id,
        token: refreshToken,
        expires_at: refreshExpiresAt
      });

    } catch (error) {
      console.error('Error creating refresh token:', error);  // Log detailed error
      return res.status(500).json({
        success: false,
        message: 'Error creating refresh token',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);  // Log detailed error
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
