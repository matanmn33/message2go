const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const createToken = (userId) => {
  const token = jwt.sign({userId}, process.env.SECRET_KEY, {expiresIn: "12h"} );
  return token;
};

const verifyToken = async(req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(403).send('Token required');
    }
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const takeUser = await User.findOne({_id: decoded.userId});

    if(decoded.userId == takeUser._id) {
      next();
    }
    
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};


module.exports = {
  createToken,
  verifyToken,
};
