import app from "./app.js";
import { sequelize } from "./models/index.js";

// This self-invoking async function will run when Vercel initializes the function (on a "cold start").
// It attempts to connect to the database and sync the schema.
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection successful during initialization.");
    await sequelize.sync({ alter: true }); // sync schema
  } catch (err) {
    // This error will be visible in your Vercel deployment logs.
    console.error("❌ DB connection failed during initialization:", err);
    // If the DB connection fails, you might want to exit the process
    // to prevent the function from being served in a broken state.
    process.exit(1); 
  }
})();

// This is the most important change!
// You export the Express 'app' as the default handler.
// Vercel uses this to process all incoming requests.
// Do NOT use app.listen().
export default app;
