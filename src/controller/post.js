const Post = require("../models/post");

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  const post = new Post({
    title,
    content,
  });

  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: "Error creating post" });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("name email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
