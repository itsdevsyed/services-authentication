// src/services/otpService.js
import crypto from 'crypto';
import EmailVerification from '../models/emailVerification.model.js';
import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';

const OTP_LENGTH = 6;
const EXPIRATION_MINUTES = 10;
const IS_DEV = process.env.NODE_ENV !== 'production';


export const generate = async (email) => {
  // 1) Find user

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found', 404);
  // 2) Create 6-digit code & hash
  const code = crypto.randomInt(0, 10 ** OTP_LENGTH)
                     .toString()
                     .padStart(OTP_LENGTH, '0');
  const tokenHash = crypto.createHash('sha256').update(code).digest('hex');
  const expiresAt = new Date(Date.now() + EXPIRATION_MINUTES * 60000);
  if (IS_DEV) {
    console.log(`🟢 [DEV] OTP for ${email}: ${code}`);
  }
  // 3) Upsert into EmailVerification
  await EmailVerification.upsert({
    user_id: user.id,
    token: tokenHash,
    expires_at: expiresAt,
    revoked_at: null,
  });

  return code;
};

export const verify = async (email, code) => {
  // 1) Find user
  const user = await User.findOne({ where: { email } });
  if (!user) throw new AppError('User not found', 404);

  // 2) Fetch OTP record
  const record = await EmailVerification.findOne({
    where: { user_id: user.id }
  });
  if (!record) throw new AppError('OTP not found', 400);

  // 3) Check expiry
  if (record.expires_at < new Date()) {
    await record.destroy();
    throw new AppError('OTP expired', 400);
  }

  // 4) Compare hashes
  const hash = crypto.createHash('sha256').update(code).digest('hex');
  if (hash !== record.token) {
    throw new AppError('Invalid OTP', 400);
  }

  // 5) Consume record
  await record.destroy();
  return true;
};

export default {
  generate,
  verify,
};
