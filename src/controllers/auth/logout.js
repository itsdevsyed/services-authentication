import User from "../../models/user.model.js";
import jwt from 'jsonwebtoken'
import redis from "../../config/redis.js";
import RefreshToken  from '../../models/refreshToken.model.js';

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({ success: false, message: 'Not authorized, no token' });
        }
        const token = authHeader.split(' ')[1];

        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        if(!decoded ||!decoded.exp){
            return res.status(400).json({ success: false, message: 'Invalid token' });
        }
        if(!refreshToken){
            return res.status(400).json({ success: false, message: 'No refresh token provided' });
        }
        await RefreshToken.destroy({where:{token:refreshToken}})
        console.error('till hee evertynig goes well ok ')
        const expireIn = decoded.exp - Math.floor(Date.now() / 1000);

        await redis.set(`bl_${token}`, expireIn, 'EX', expireIn);

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
         });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

