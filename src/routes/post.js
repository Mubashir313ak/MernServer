const express = require("express");
const { createPost } = require("../controller/post");
const authMiddleware = require("../middleware/auth"); // Changed to CommonJS require
const router = express.Router();

router.post("/create-post", authMiddleware, createPost); // Removed () from authMiddleware

module.exports = router;
