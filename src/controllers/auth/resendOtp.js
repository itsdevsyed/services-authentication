import { generate as generateOtp } from '../../services/otpService.js';
import logger from '../../utils/logger.js';
import AppError from '../../utils/AppError.js';

export const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const code = await generateOtp(email);
    res.status(202).json({ status: 'pending', message: 'OTP sent' });
  } catch (error) {
    if (error instanceof AppError) {
      // Handle specific AppErrors thrown by generateOtp
      return res.status(error.statusCode).json({ status: 'fail', message: error.message });
    } else {
      // Handle other unexpected errors
      logger.error('Error resending OTP:', error);
      return res.status(500).json({ status: 'error', message: 'Failed to resend OTP' });
    }
  }
};
