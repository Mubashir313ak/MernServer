const Comment = require("../models/comments");
const Post = require("../models/post");

const addComment = async (req, res) => {
  try {
    const { content, author, postId } = req.body;

    // Check if all fields are provided
    if (!content || !author || !postId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create and save the comment
    const newComment = new Comment({
      content,
      author, // user ID of the comment author
      post: postId, // ID of the post being commented on
    });

    const savedComment = await newComment.save();

    // Update the post with the new comment
    post.comments.push(savedComment._id);
    await post.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addComment;
