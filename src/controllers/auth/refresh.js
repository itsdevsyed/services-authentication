import jwt from "jsonwebtoken";
import RefreshToken from "../../models/refreshToken.model.js";
import User from "../../models/user.model.js";

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken: refreshTokenValue } = req.body;

    if (!refreshTokenValue) {
      return res.status(400).json({
        success: false,
        message: "No refresh token provided",
      });
    }

    // Find the refresh token in the database
    const refreshToken = await RefreshToken.findOne({
      where: { token: refreshTokenValue },
    });

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // Check if the refresh token has expired
    const currentTime = new Date();
    if (refreshToken.expires_at < currentTime) {
      return res.status(400).json({
        success: false,
        message: "Refresh token has expired",
      });
    }

    // Find the user associated with the refresh token
    const user = await User.findByPk(refreshToken.user_id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate a new JWT (access token)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        token, // New access token
        refreshToken: refreshTokenValue, // Existing refresh token
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
