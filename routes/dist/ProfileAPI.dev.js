"use strict";

var express = require("express");

var router = express.Router();

var _require = require("express-validator"),
    check = _require.check,
    validationResult = _require.validationResult;

var auth = require("../middleware/authorization");

var Profile = require("../models/Profile");

var Products = require("../models/proucts");

var User = require("../models/User");

router.get("/:id", function _callee(req, res) {
  var profile;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Profile.findOne({
            userId: req.params.id
          }));

        case 3:
          profile = _context.sent;

          if (profile) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: "There is no such profile"
          }));

        case 6:
          res.json(profile);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send("Server error");

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.post("/", [auth, [check("address", "Address is required").not().isEmpty()], [check("bio", "Bio is required").not().isEmpty()]], function _callee2(req, res) {
  var errors, _req$body, website, address, bio, facebook, twitter, instagram, youtube, linkedin, profileData, profile;

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
          _req$body = req.body, website = _req$body.website, address = _req$body.address, bio = _req$body.bio, facebook = _req$body.facebook, twitter = _req$body.twitter, instagram = _req$body.instagram, youtube = _req$body.youtube, linkedin = _req$body.linkedin;
          profileData = {};
          profileData.userId = req.user.id;
          if (website) profileData.website = website;
          if (address) profileData.address = address;
          if (bio) profileData.bio = bio; //put social media links into an object

          profileData.socialMedia = {};
          if (facebook) profileData.socialMedia.facebook = facebook;
          if (instagram) profileData.socialMedia.instagram = instagram;
          if (twitter) profileData.socialMedia.twitter = twitter;
          if (youtube) profileData.socialMedia.youtube = youtube;
          if (linkedin) profileData.socialMedia.linkedin = linkedin;
          _context2.prev = 15;
          _context2.next = 18;
          return regeneratorRuntime.awrap(Profile.findOne({
            userId: req.user.id
          }));

        case 18:
          profile = _context2.sent;

          if (!profile) {
            _context2.next = 24;
            break;
          }

          _context2.next = 22;
          return regeneratorRuntime.awrap(Profile.findOneAndUpdate({
            userId: req.user.id
          }, {
            $set: profileData
          }, {
            "new": true
          }));

        case 22:
          profile = _context2.sent;
          return _context2.abrupt("return", res.json(profile));

        case 24:
          profile = new Profile(profileData);
          _context2.next = 27;
          return regeneratorRuntime.awrap(profile.save());

        case 27:
          res.json(profile);
          _context2.next = 34;
          break;

        case 30:
          _context2.prev = 30;
          _context2.t0 = _context2["catch"](15);
          console.error(_context2.t0.message);
          res.status(400).send("Server Error");

        case 34:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[15, 30]]);
});
router["delete"]("/", auth, function _callee4(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Products.find({
            userId: req.user.id
          }));

        case 3:
          products = _context4.sent;
          products.foreach(function _callee3(products) {
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return regeneratorRuntime.awrap(Profile.findOneAndRemove({
                      _id: product._id
                    }));

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });
          _context4.next = 7;
          return regeneratorRuntime.awrap(Profile.findOneAndRemove({
            userId: req.user.id
          }));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(User.findOneAndRemove({
            _id: req.user.id
          }));

        case 9:
          res.json({
            msg: "User details completely deleted"
          });
          _context4.next = 16;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);
          res.status(400).send("Server Error");

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
module.exports = router;