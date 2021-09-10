"use strict";

var jwt = require("jsonwebtoken");

var config = require("../config/keys");

module.exports = function (req, res, next) {
  var token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      msg: "you do not have the right authorization"
    });
  }

  try {
    var decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "invalid token"
    });
  }
};