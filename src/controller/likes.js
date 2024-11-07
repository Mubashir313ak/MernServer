const Like = require("../models/likes");
const Post = require("../models/post");

const addLike = async (req, res) => {
  try {
    const { user, postId } = req.body;

    // Check if all fields are provided
    if (!user || !postId) {
      return res.status(400).json({ message: "User and post ID are required" });
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
};

module.exports = addLike;
