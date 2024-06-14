const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

const authRouter = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;
authRouter.post("/login", async (req, res) => {
  console.log("in login api");
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token: token, message: "sucessfull logged in" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
authRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.admin = decoded;
    next();
  });
};

module.exports = { authRouter, authMiddleware };
