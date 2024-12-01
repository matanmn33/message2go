const bcrypt = require("bcrypt");
const Auth = require("./authController");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const { createOrUpdateMessage } = require("../services/chatService");


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
  const { chatid, from, to, message, sender } = req.body;

  try {
    const result = await createOrUpdateMessage({ chatid, from, to, message, sender });
    res.status(200).json({ success: true, message: "Message added successfully!", result });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ success: false, error: error.message });
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

const FindAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    if (chats.length > 0) {
      res.send(chats);
    }
  } catch (err) {
    res.send("Could not get the stated chat, Error: " + err);
  }
}

const FindMessageByID = async (req, res) => {
  try {
    const current_message = await Message.findOne({chatid: req.params.chatid});
    res.send(current_message);
  } catch (err) {
    res.send("Could not get the stated chat, Error: " + err);
  }
}

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  FindUserByID,
  UpdateUserByID,
  AddContact,
  NewChat,
  AddChat,
  FindAllChats,
  FindMessageByID
};
