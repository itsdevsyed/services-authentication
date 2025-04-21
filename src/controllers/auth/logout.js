import RefreshToken from '../../models/refreshToken.model.js';
import jwt from 'jsonwebtoken'; // ✅ Needed for decoding the access token


export const logout = async (req, res) => {
  try {
    // Get refresh token from body or cookie
    const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'No refresh token provided',
      });
    }

    // Delete refresh token from DB
    try {
      const deleted = await RefreshToken.destroy({ where: { token: refreshToken } });
      if (deleted === 0) {
        console.warn('Refresh token not found in database:', refreshToken);
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
    }

    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    // Blacklist access token if sent
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.split(' ')[1];

      try {
        const decoded = jwt.decode(accessToken);
        if (decoded?.exp) {
          const expireIn = decoded.exp - Math.floor(Date.now() / 1000);
          if (expireIn > 0) {
            await redis.set(`bl_${accessToken}`, 'true', 'EX', expireIn);
          }
        }
      } catch (redisError) {
        console.error('Redis error:', redisError);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });

  } catch (error) {
    console.error('[Logout Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
