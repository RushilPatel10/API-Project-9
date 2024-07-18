const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).send("Username or password not match");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ username }, "Private-key");
      res.cookie("token", token);
      return res.status(200).send("Login Successfully!");
    }
    res.status(401).send("Username or password not match");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser, userLogin };
