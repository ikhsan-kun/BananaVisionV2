const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysis.controller");
const { authenticate } = require("../middleware/auth");

router.use(authenticate);

router.post("/analyze", analysisController.analyzeImage);

router.get("/", analysisController.getAnalyses);

router.get("/dashboard/stats", analysisController.getDashboardStats);

router.get("/dashboard/trends", analysisController.getDashboardTrends);

module.exports = router;
