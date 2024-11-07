const Comment = require("../models/comments");
const Post = require("../models/post");

const addComment = async (req, res) => {
  try {
    const { content, author, postId, parentComment } = req.body; // parentComment is optional for replies

    // Check if all fields are provided
    if (!content || !author || !postId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the parent comment exists (if it's a reply)
    let parent = null;
    if (parentComment) {
      parent = await Comment.findById(parentComment);
      if (!parent) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
    }

    // Create and save the comment (or reply)
    const newComment = new Comment({
      content,
      author, // user ID of the comment author
      post: postId, // ID of the post being commented on
      parentComment: parent ? parent._id : null, // Set parentComment if it's a reply
    });

    const savedComment = await newComment.save();

    // If it's a reply, add the comment to the parent comment's replies
    if (parent) {
      parent.replies = parent.replies || []; // Initialize replies array if it's not there
      parent.replies.push(savedComment._id); // Add the new comment to the parent comment's replies
      await parent.save();
    }

    // If it's not a reply, add the comment to the post
    if (!parent) {
      post.comments.push(savedComment._id); // Add the comment to the post's comments
      await post.save();
    }

    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// To add a reply to a comment, you would send a request like:
// {
//   "content": "This is a reply to a comment",
//   "author": "userId123",
//   "postId": "postId456",
//   "parentComment": "commentId789" // The ID of the comment you are replying to
// }

module.exports = addComment;

module.exports = addComment;
