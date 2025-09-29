import express from "express";
import { getActivities } from "../controllers/activityController.js";

const router = express.Router();

router.get("/", getActivities);  // Get all activities

export default router;
