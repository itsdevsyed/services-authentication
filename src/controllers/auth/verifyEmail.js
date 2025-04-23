import { verify as verifyOtp } from '../../services/otpService.js';
import { generate } from '../../services/otpService.js';
import AppError from '../../utils/AppError.js'; // Import AppError

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new AppError('Email and OTP are required', 400); // Use AppError
  }

  try {
    // 1) verify the OTP
    await verifyOtp(email, otp);

    // 2) mark user emailVerified + issue JWT
    const token = await generate(email);

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (error) {
    // Handle errors that might come from verifyOtp (like OTP expired)
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ status: 'fail', message: error.message });
    }
    // Handle other unexpected errors
    console.error('Error verifying email:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
