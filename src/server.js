import app from "./app.js";
import connectDB from "./database/connection.js";

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Great, server running on port ${PORT}`);
});