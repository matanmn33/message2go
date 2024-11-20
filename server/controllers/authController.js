const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  const token = jwt.sign({userId}, process.env.SECRET_KEY, {expiresIn: "12h"} );
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (!token) {
    return res.status(403).send('Token required');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user._id = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};

module.exports = {
  createToken,
  verifyToken,
};
