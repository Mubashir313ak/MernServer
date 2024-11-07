const express = require("express");
const addLike = require("../controller/likes");
const router = express.Router();

// Route for adding a like to a post
router.post("/:postId/like", addLike);

module.exports = router;
