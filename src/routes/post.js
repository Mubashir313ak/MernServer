const express = require("express");
const { createPost, postDetail } = require("../controller/post");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/create-post", authMiddleware, createPost);
router.get("/post-detail/:postId", authMiddleware, postDetail); // Removed () from authMiddleware

module.exports = router;
