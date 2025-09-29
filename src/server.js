import app from "./app.js";
import { sequelize } from "./models/index.js"; // make sure index.js exists in /models

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to DB");
    await sequelize.sync({ alter: true }); // sync schema
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
})();
