import express from "express";
import {
  createSurvey,
  getSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
  activateSurvey,
} from "../controllers/surveyController.js";

const router = express.Router();

router.post("/", createSurvey);
router.get("/", getSurveys);
router.get("/:id", getSurveyById);
router.put("/:id", updateSurvey);
router.patch("/:id/activate", activateSurvey); // Activate survey
router.delete("/:id", deleteSurvey);

export default router;
