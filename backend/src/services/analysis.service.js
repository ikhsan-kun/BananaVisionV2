const AnalysisModel = require("../models/analysisModel");
const DiseaseModel = require("../models/diseaseModel");
const axios = require("axios");
const respone = require("../utils/response");

const ML_SERVER_URL = process.env.ML_SERVER_URL || "http://localhost:5001";

class AnalysisService {
  static async analyzeImage(userId, imageBase64, notes = null) {
    try {
      // Call Python ML server for prediction
      const mlResponse = await axios.post(`${ML_SERVER_URL}/api/predict`, {
        image: imageBase64,
      });

      if (!mlResponse.data.success) {
        throw new Error("ML prediction failed");
      }

      const predictionData = mlResponse.data.data;

      // Get or create disease record
      let disease = await DiseaseModel.getDiseaseByName(
        predictionData.detectedDisease,
      );

      // Create analysis record
      const analysis = await AnalysisModel.createAnalysis({
        userId,
        imageUrl: `data:image/jpeg;base64,${imageBase64.substring(0, 100)}...`, // Store base64 pointer or cloud URL
        detectedDisease: predictionData.detectedDisease,
        diseaseId: disease ? disease.id : null,
        confidence: predictionData.confidence,
        status: "completed",
        predictions: predictionData.predictions,
        notes,
      });

      return analysis;
    } catch (error) {
      throw error;
    }
  }

  static async createAnalysis(data) {
    try {
      return await AnalysisModel.createAnalysis(data);
    } catch (error) {
      throw error;
    }
  }

  static async getAnalysisById(id) {
    try {
      const analysis = await AnalysisModel.getAnalysisById(id);
      if (!analysis) {
        throw new Error("Analysis not found");
      }
      return analysis;
    } catch (error) {
      throw error;
    }
  }

  static async getAnalysesByUserId(userId) {
    return await AnalysisModel.getAnalysesByUserId(userId);
  }

  static async deleteAnalysis(id) {
    return await AnalysisModel.deleteAnalysis(id);
  }

  static async getDashboardStats(userId) {
    try {
      const analyses = await AnalysisModel.getAnalysesByUserId(userId);

      const totalAnalyses = analyses.length;
      const diseaseCounts = {};

      analyses.forEach((analysis) => {
        if (analysis.disease) {
          diseaseCounts[analysis.disease] =
            (diseaseCounts[analysis.disease] || 0) + 1;
        }
      });

      return {
        totalAnalyses,
        diseaseCounts,
        lastAnalysis: analyses.length > 0 ? analyses[0] : null,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getDashboardTrends(userId, period = "7d") {
    try {
      const analyses = await AnalysisModel.getAnalysesByUserId(userId);

      const trends = [];
      const now = new Date();
      let days = 7;

      if (period === "30d") days = 30;
      if (period === "1y") days = 365;

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];

        const count = analyses.filter((a) => {
          const analysisDate = new Date(a.createdAt)
            .toISOString()
            .split("T")[0];
          return analysisDate === dateStr;
        }).length;

        trends.push({
          date: dateStr,
          count,
        });
      }

      return trends;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AnalysisService;
