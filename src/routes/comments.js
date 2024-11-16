const express = require("express");
const addComment = require("../controller/comments");
const router = express.Router();
// const addLike = require("../controllers/addLike");

// Route for adding a comment to a post
router.post("/:postId/comments", addComment);

// Route for adding a like to a post
// router.post("/posts/:postId/like", addLike);

module.exports = router;
