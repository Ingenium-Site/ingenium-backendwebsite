import "dotenv/config";
import app from "./app.js";
import connectDB from "./database/connection.js";

const PORT = Number(process.env.PORT) || 5001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Great, server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
