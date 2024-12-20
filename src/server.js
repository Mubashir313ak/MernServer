require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware setup
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Base route for testing
app.get("/", (req, res) => {
  res.send("API is running");
});

// Define your API routes
app.use("/api/users", require("./routes/user"));
app.use("/api/post", require("./routes/post"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/like", require("./routes/likes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Export the app for Vercel
module.exports = app;
