"use strict";

var express = require("express");

var router = express.Router();

var auth = require("../middleware/authorization");

var User = require("../models/User");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var config = require("../config/keys");

var _require = require("express-validator"),
    check = _require.check,
    validationResult = _require.validationResult;

router.get("/", auth, function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select("-password"));

        case 3:
          user = _context.sent;
          res.json(user);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post("/", [check("email", "Please enter a valid email").isEmail(), check("password", "Password is required").exists()], function _callee2(req, res) {
  var errors, _req$body, email, password, user, match, payload;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context2.prev = 3;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context2.sent;

          if (user) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: [{
              msg: "Invalid username or password"
            }]
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 12:
          match = _context2.sent;

          if (match) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: [{
              msg: "Invalid username or password"
            }]
          }));

        case 15:
          payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(payload, config.jwtSecret, {
            expiresIn: 3600 * 24
          }, function (err, token) {
            if (err) throw err;
            res.json({
              token: token
            });
          }); //res.send("User created");

          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](3);
          console.error(_context2.t0);
          res.status(500).send("Server error");

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 19]]);
});
module.exports = router;