import express from "express";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/", createQuestion);        // Create a question
router.get("/", getQuestions);           // Get all questions
router.get("/:id", getQuestionById);     // Get question by ID
router.put("/:id", updateQuestion);      // Update question
router.delete("/:id", deleteQuestion);   // Delete question

export default router;
