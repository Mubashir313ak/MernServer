const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: { type: String }, // Store the commenter's name here
    authorUserName: { type: String }, // Store the commenter's username here
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Reference to the post
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
