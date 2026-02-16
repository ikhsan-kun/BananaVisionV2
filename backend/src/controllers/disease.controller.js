const DiseaseService = require("../services/disease.service");
const { successResponse, errorResponse } = require("../utils/response");

class DiseaseController {
  static async createDisease(req, res) {
    try {
      const data = req.body;
      const disease = await DiseaseService.createDisease(data);
      return successResponse(res, disease, "Disease created successfully", 201);
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to create disease",
        500,
      );
    }
  }

  static async getDiseaseById(req, res) {
    try {
      const { id } = req.params;
      const disease = await DiseaseService.getDiseaseById(id);
      return successResponse(res, disease, "Disease retrieved successfully");
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to retrieve disease",
        404,
      );
    }
  }

  static async getDiseases(req, res) {
    try {
      const { category } = req.query;
      const filters = category ? { category } : {};
      const diseases = await DiseaseService.getDiseases(filters);
      return successResponse(res, diseases, "Diseases retrieved successfully");
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to retrieve diseases",
        500,
      );
    }
  }

  static async updateDisease(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const disease = await DiseaseService.updateDisease(id, data);
      return successResponse(res, disease, "Disease updated successfully");
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to update disease",
        500,
      );
    }
  }

  static async deleteDisease(req, res) {
    try {
      const { id } = req.params;
      const disease = await DiseaseService.deleteDisease(id);
      return successResponse(res, disease, "Disease deleted successfully");
    } catch (error) {
      return errorResponse(
        res,
        error.message || "Failed to delete disease",
        500,
      );
    }
  }
}

module.exports = DiseaseController;
