const bcrypt = require("bcrypt");
const Auth = require("./authController");
const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.send("Could not fetch all users, ERROR: " + err.message);
  }
};

const registerUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      created_at: Date.now(),
    });
    await newUser.save();
    res.send("User created successfully");
  } catch (err) {
    res.send(
      "Could not register a new user to the system, ERROR: " + err.message
    );
  }
};


const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const userPw = req.body.password;
    if (user) {
      const validPass = await bcrypt.compare(userPw, user.password);
      if (validPass) {

        const token = Auth.createToken(`${user._id}`);

        res.cookie("jwt", token);
        res.json({ message: "Logged in successfully", token });

      } else {
        res.send("Invalid password");
      }
    } else {
      res.send("Couldn't find a user to login.");
    }
  } catch (err) {
    res.send("Could not login the user, ERROR: " + err.message);
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
};
