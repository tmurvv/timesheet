const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const { fail } = require("assert");
const { Users } = require("../assets/data/UserSchema");

exports.protect = async (req, res, next) => {
  let token;
  let decodedJwt;
  // JWT token exists
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({
    status: fail,
    message: "Permissions not found. Please log in again."
  });
  // verify JWT token
  try {
    decodedJwt = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (e) {
    if (e.message === 'invalid signature' || e.message==='jwt expired') e={...e,message: "Something went wrong with your permissions. Please log in again."};
    return res.status(401).json({
      status: fail,
      message: e.message
    });
  }
  // user still exists
  let potentialUser;
  try {
    potentialUser = await Users.findById(decodedJwt.id)
    if (!potentialUser) {
      return res.status(401).json({
        status: fail,
        message: "User not found. Please log in again."
      });
    }
  } catch (e) {
    return res.status(401).json({
      status: fail,
      message: e.message
    });
  }
  // password changed after token created?
  if(potentialUser.changedPasswordAfter(decodedJwt.iat)) {
    return res.status(401).json({
      status: fail,
      message: "Password changed after permissions granted. Please log in again."
    });
  };
  // grant access to next middleware
  req.user = potentialUser;
  next();
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      // roles ['admin', 'lead-guide']. role='user'
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
    };
  };