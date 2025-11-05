import app from "./app.js";
import { sequelize } from "./models/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");
    // Sync models (in production use migrations instead)
    await sequelize.sync({ alter: true }); // alter:true for dev convenience
    console.log("Models synced.");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error("Unable to start server:", err);
    process.exit(1);
  }
})();