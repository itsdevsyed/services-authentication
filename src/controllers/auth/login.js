 import Joi from "joi";
 import bcrypt from 'bcrypt'
 import jwt from 'jsonwebtoken'
 import User from '../../models/user.model.js';




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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
