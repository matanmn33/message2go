const bcrypt = require("bcrypt");
const Auth = require("./authController");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id username");
    res.send(users);
  } catch (err) {
    res.send("Could not fetch all users, ERROR: " + err.message);
  }
};

const FindUserByID = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findOne({_id: id});
    res.send(user);
  } catch (err) {
    res.send("Could not fetch all users, ERROR: " + err.message);
  }
};

const UpdateUserByID = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          updated_at: new Date()
      }, {new: true}
    );
    await user.save();
    res.send(user);
  } catch (err) {
    res.send("Could not fetch all users, ERROR: " + err.message);
  }
};

const AddContact = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
          contacts: req.body.contacts,
          updated_at: new Date()
      }, {new: true}
    );
    await user.save();
    res.send(user);
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

const NewChat = async (req, res) => {
  try {
    const { chatid, from, to, message } = req.body;
    const newMsg = new Message({ chatid, from, to, message });
    await newMsg.save();
    res.send("Chat created successfully");
  } catch (err) {
    res.send(
      "Could not register a new Chat to the system, ERROR: " + err.message
    );
  }
};

const AddChat = async (req, res) => {
  try {
    const { chatid, members } = req.body;
    const existingChat = await Chat.findOne({ chatid });
    if (existingChat) {
      return res.status(400).send("Chat already exists");
    }

    const newChat = new Chat({ chatid, members });
    await newChat.save();
    res.send("Chat created successfully");
  } catch (err) {
    res.send(
      "Could not register a new Chat to the system, ERROR: " + err.message
    );
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  FindUserByID,
  UpdateUserByID,
  AddContact,
  NewChat,
  AddChat
};
