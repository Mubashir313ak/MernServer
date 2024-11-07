const mongoose = require("mongoose");
const Like = require("../models/likes");
const Post = require("../models/post");

const CONTROLLER_LIKE = {
  addLike: async (req, res) => {
    try {
      const { user, postId } = req.body;

      // Check if all fields are provided
      if (!user || !postId) {
        return res
          .status(400)
          .json({ message: "User and post ID are required" });
      }

      // Validate ObjectIds
      if (
        !mongoose.Types.ObjectId.isValid(user) ||
        !mongoose.Types.ObjectId.isValid(postId)
      ) {
        return res.status(400).json({ message: "Invalid user or post ID" });
      }

      // Check if the user has already liked the post
      const existingLike = await Like.findOne({ user, post: postId });
      if (existingLike) {
        return res
          .status(400)
          .json({ message: "You have already liked this post" });
      }

      // Create and save the like
      const newLike = new Like({
        user, // user ID of the user liking the post
        post: postId, // ID of the post being liked
      });

      const savedLike = await newLike.save();

      // Update the post with the new like
      const post = await Post.findById(postId);
      post.likes.push(savedLike._id);
      await post.save();

      res.status(201).json(savedLike);
    } catch (error) {
      console.error("Error adding like:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  removeLike: async (req, res) => {
    try {
      const { user, postId } = req.body;

      // Check if all fields are provided
      if (!user || !postId) {
        return res
          .status(400)
          .json({ message: "User and post ID are required" });
      }

      // Validate ObjectIds
      if (
        !mongoose.Types.ObjectId.isValid(user) ||
        !mongoose.Types.ObjectId.isValid(postId)
      ) {
        return res.status(400).json({ message: "Invalid user or post ID" });
      }

      // Check if the user has liked the post
      const existingLike = await Like.findOne({ user, post: postId });
      if (!existingLike) {
        return res
          .status(400)
          .json({ message: "You haven't liked this post yet" });
      }

      // Remove the like from the Post model
      const post = await Post.findById(postId);
      post.likes.pull(existingLike._id); // Pull the like ID out of the likes array
      await post.save();

      // Delete the like document from the Like model
      await existingLike.deleteOne(); // Use deleteOne instead of remove

      res.status(200).json({ message: "Post unliked successfully" });
    } catch (error) {
      console.error("Error removing like:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Export the controller using CommonJS syntax
module.exports = CONTROLLER_LIKE;
