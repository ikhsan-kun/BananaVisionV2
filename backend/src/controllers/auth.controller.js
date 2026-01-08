const AuthService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response');

class AuthController {

  static async loginWithGoogle(req, res) {
    try {
      const { idToken } = req.body;

      const result = await AuthService.loginWithGoogle(idToken);

      return successResponse(
        res,
        result,
        'Login successful',
        200
      );
    } catch (error) {
      console.error('Login error:', error);
      return errorResponse(
        res,
        error.message || 'Login failed',
        401
      );
    }
  }
  static async getProfile(req, res) {
    try {
      const user = await AuthService.getUserProfile(req.user.id);

      return successResponse(
        res,
        { user },
        'Profile retrieved successfully'
      );
    } catch (error) {
      console.error('Get profile error:', error);
      return errorResponse(
        res,
        error.message || 'Failed to get profile',
        404
      );
    }
  }

  // PUT /api/auth/profile
  static async updateProfile(req, res) {
    try {
      const { name, avatar, notifications, language } = req.body;

      const user = await AuthService.updateProfile(req.user.id, {
        ...(name && { name }),
        ...(avatar && { avatar }),
        ...(notifications !== undefined && { notifications }),
        ...(language && { language }),
      });

      return successResponse(
        res,
        { user },
        'Profile updated successfully'
      );
    } catch (error) {
      console.error('Update profile error:', error);
      return errorResponse(
        res,
        error.message || 'Failed to update profile',
        400
      );
    }
  }


  // GET /api/auth/verify
  static async verifyToken(req, res) {
    try {
      // If middleware passed, token is valid
      const user = await AuthService.getUserProfile(req.user.id);

      return successResponse(
        res,
        { user, valid: true },
        'Token is valid'
      );
    } catch (error) {
      return errorResponse(
        res,
        'Invalid token',
        401
      );
    }
  }
}

module.exports = AuthController;