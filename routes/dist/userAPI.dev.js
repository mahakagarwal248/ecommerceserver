"use strict";

var express = require("express");

var router = express.Router();

var _require = require("express-validator"),
    check = _require.check,
    validationResult = _require.validationResult;

var bcrypt = require("bcryptjs");

var User = require("../models/User");

var jwt = require("jsonwebtoken");

var config = require("../config/keys");

router.get("/", function (req, res) {
  return res.send("User route");
});
router.post("/", [check("name", "Name is required").not().isEmpty(), check("email", "Please enter a valid email").isEmail(), check("password", "Please password should have atleast 5 characters").isLength({
  min: 5
})], function _callee(req, res) {
  var errors, _req$body, name, email, password, role, user, salt, payload;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context.prev = 3;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context.sent;

          if (!user) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: [{
              msg: "user already exista"
            }]
          }));

        case 10:
          user = new User({
            name: name,
            email: email,
            password: password,
            role: role
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 13:
          salt = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 16:
          user.password = _context.sent;
          user.save();
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

          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0);
          res.status(500).send("Server error");

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 22]]);
});
module.exports = router;