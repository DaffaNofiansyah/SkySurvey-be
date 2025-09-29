import express from "express";
import {
  createResponse,
  getResponses,
} from "../controllers/responseController.js";

const router = express.Router();

router.post("/", createResponse);   // Submit a response
router.get("/", getResponses);      // Get all responses

export default router;
