const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Adjust path as necessary

// Signup function
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user instance
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error); // Log for debugging
    res.status(400).json({ error: "User registration failed" });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found with email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.error("Password mismatch for user:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error); // Log error details
    res.status(400).json({ error: "Login failed" });
  }
};
