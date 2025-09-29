import express from "express";
import {
  createAnswer,
  getAnswers,
  getAnswerById,
  deleteAnswer,
} from "../controllers/answerController.js";

const router = express.Router();

router.post("/", createAnswer);        // Create an answer
router.get("/", getAnswers);           // Get all answers
router.get("/:id", getAnswerById);     // Get answer by ID
router.delete("/:id", deleteAnswer);   // Delete answer

export default router;
