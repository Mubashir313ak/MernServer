const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },

  password: { type: String, required: true },
  whatsappNumber: { type: Number, required: true },
  picture: {
    type: String,
    default:
      "https://media-bucket-meuzi.s3.ap-southeast-1.amazonaws.com/user.png",
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // References to users who follow this user
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // References to users this user is following
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
