import { verify as verifyOtp } from '../../services/otpService.js';
import { generate } from '../../services/otpService.js';

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new Error('Email and OTP are required', 400);
  }

  // 1) verify the OTP
  await verifyOtp(email, otp);

  // 2) mark user emailVerified + issue JWT
  const token = await generate(email);

  res.status(200).json({
    status: 'success',
    token,
  });
};
