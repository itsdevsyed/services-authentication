import { generate as generateOtp } from '../../services/otpService.js';

export const resendOtp = async (req, res) => {
  const { email } = req.body;
  const code = await generateOtp(email);
  res.status(202).json({ status: 'pending', message: 'OTP sent' });
};
