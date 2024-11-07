const Post = require("../models/post");

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body; // Destructure author from req.body

  const post = new Post({
    title,
    content,
    author, // Include author in the new Post instance
  });

  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error); // Log error for debugging
    res.status(400).json({ message: "Error creating post" });
  }
};

exports.postDetail = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "author",
        select: "name userName",
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (erreor) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
