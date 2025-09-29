import { Activity, Survey } from "../models/index.js";

// Get all activities
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({ include: Survey });
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
