const express = require("express");
const CONTROLLER_LIKE = require("../controller/likes"); // Use require to import the controller
const router = express.Router();

// Route for adding a like to a post
router.post("/:postId/like", CONTROLLER_LIKE.addLike);
router.post("/:postId/unlike", CONTROLLER_LIKE.removeLike); // Correctly call the removeLike function

module.exports = router;
