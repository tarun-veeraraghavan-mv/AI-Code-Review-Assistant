const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ id: user._id }, "SECRET", {
    expiresIn: "90d",
  });

  res.status(201).json({ token, user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      error: "No user exists with this email!",
    });
    return;
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    res.status(401).json({
      error: "Passwords do not match",
    });
    return;
  }

  const token = jwt.sign({ id: user._id }, "SECRET", {
    expiresIn: "90d",
  });

  res.status(200).json({ token, user });
};

exports.me = async (req, res) => {
  let token;

  try {
    token = req.body?.token;

    if (!token) {
      return res.status(401).json({ error: "User is not authorized" });
    }

    const decoded = await promisify(jwt.verify)(token, "SECRET");
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    res.json(user);
  } catch (err) {
    console.error("JWT decode or DB error:", err.message); // helpful for debugging
    res.status(401).json({ error: "Invalid token" });
  }
};
