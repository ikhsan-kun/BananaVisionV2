const AnalysisService = require("../services/analysis.service");
const { successResponse, errorResponse } = require("../utils/response");

class AnalysisController {
  static async analyzeImage(req, res) {
    try {
      const userId = req.user.id;
      const { imageBase64, notes } = req.body;

      if (!imageBase64) {
        return errorResponse(res, "Image is required", 400);
      }

      const analysis = await AnalysisService.analyzeImage(
        userId,
        imageBase64,
        notes,
      );
      return successResponse(res, analysis, "Image analyzed successfully", 201);
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to analyze image",
        500,
      );
    }
  }

  static async createAnalysis(req, res) {
    try {
      const data = req.body;
      const analysis = await AnalysisService.createAnalysis(data);
      return successResponse(
        res,
        analysis,
        "Analysis created successfully",
        201,
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to create analysis",
        500,
      );
    }
  }
  static async getAnalysisById(req, res) {
    try {
      const { id } = req.params;
      const analysis = await AnalysisService.getAnalysisById(id);
      return successResponse(res, analysis, "Analysis retrieved successfully");
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to retrieve analysis",
        404,
      );
    }
  }
  static async getAnalysesByUserId(req, res) {
    try {
      const { userId } = req.params;
      const analyses = await AnalysisService.getAnalysesByUserId(userId);
      return successResponse(res, analyses, "Analyses retrieved successfully");
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to retrieve analyses",
        500,
      );
    }
  }

  static async deleteAnalysis(req, res) {
    try {
      const { id } = req.params;
      const deletedAnalysis = await AnalysisService.deleteAnalysis(id);
      return successResponse(
        res,
        deletedAnalysis,
        "Analysis deleted successfully",
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to delete analysis",
        500,
      );
    }
  }

  static async getAnalyses(req, res) {
    try {
      const userId = req.user.id;
      const analyses = await AnalysisService.getAnalysesByUserId(userId);
      return successResponse(res, analyses, "Analyses retrieved successfully");
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to retrieve analyses",
        500,
      );
    }
  }

  static async getDashboardStats(req, res) {
    try {
      const userId = req.user.id;
      const stats = await AnalysisService.getDashboardStats(userId);
      return successResponse(
        res,
        stats,
        "Dashboard stats retrieved successfully",
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to retrieve dashboard stats",
        500,
      );
    }
  }

  static async getDashboardTrends(req, res) {
    try {
      const userId = req.user.id;
      const { period } = req.query;
      const trends = await AnalysisService.getDashboardTrends(userId, period);
      return successResponse(
        res,
        trends,
        "Dashboard trends retrieved successfully",
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to retrieve dashboard trends",
        500,
      );
    }
  }
}

module.exports = AnalysisController;
