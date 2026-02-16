const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/disease.controller");
const { authenticate } = require("../middleware/auth");

// Public routes - get diseases
router.get("/", diseaseController.getDiseases);
router.get("/:id", diseaseController.getDiseaseById);

// Protected routes - admin/edit
router.post("/", authenticate, diseaseController.createDisease);
router.put("/:id", authenticate, diseaseController.updateDisease);
router.delete("/:id", authenticate, diseaseController.deleteDisease);

module.exports = router;
