import app from "./app.js";
import { sequelize } from "./models/index.js";

// Initialize DB connection and sync schema
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected!");
    await sequelize.sync({ alter: true });

    // Start the server after DB is ready
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1); // Exit if DB connection fails
  }
})();
