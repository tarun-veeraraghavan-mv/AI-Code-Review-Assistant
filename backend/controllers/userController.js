const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.email == email) {
      res.status(400).json({
        error: "User currently exists!",
      });
      return;
    }

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, "SECRET", {
      expiresIn: "90d",
    });

    res.status(201).json({ token, user });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res
        .status(400)
        .json({ error: "Unexpected error occured! Please try again later" });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      error: "No user exists with this email!",
    });
    return;
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    res.status(400).json({
      error: "Passwords do not match",
    });
    return;
  }

  const token = jwt.sign({ id: user._id }, "SECRET", {
    expiresIn: "90d",
  });
  res.status(200).json({ token, user });
};

exports.findUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res
        .status(400)
        .json({ error: "Unexpected error occured! Please try again later" });
    }
  }
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
    console.error("JWT decode or DB error:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.findUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const user = await User.findById(id);

  res.status(200).json(user);
};
