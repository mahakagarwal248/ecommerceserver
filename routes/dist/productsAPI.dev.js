"use strict";

var express = require("express");

var router = express.Router();

var auth = require("../middleware/authorization");

var _require = require("express-validator"),
    check = _require.check,
    validationResult = _require.validationResult;

var Product = require("../models/proucts");

router.post("/", [auth, [check("name", "Name is required").not().isEmpty(), check("description", "Description is required").not().isEmpty(), check("category", "Category is required").not().isEmpty(), check("price", "Price is required").not().isEmpty(), check("quantity", "Quantity is required").not().isEmpty()]], function _callee(req, res) {
  var errors, _req$body, name, description, category, price, brand, quantity, newProduct, product;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.statusCode(400).json({
            errors: errors.array()
          }));

        case 3:
          _context.prev = 3;
          _req$body = req.body, name = _req$body.name, description = _req$body.description, category = _req$body.category, price = _req$body.price, brand = _req$body.brand, quantity = _req$body.quantity;
          newProduct = new Product({
            userId: req.user.id,
            name: name,
            description: description,
            category: category,
            price: price,
            brand: brand,
            quantity: quantity
          });
          _context.next = 8;
          return regeneratorRuntime.awrap(newProduct.save());

        case 8:
          product = _context.sent;
          res.json({
            product: product
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0.message);
          res.status(500).send("Server error");

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
}); //get all products

router.get("/", function _callee2(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.find());

        case 3:
          products = _context2.sent;
          res.json(products);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);
          res.status(500).send("Server error");

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //get particular product

router.get("/:id", function _callee3(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 3:
          product = _context3.sent;

          if (product) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            msg: "Product was not found"
          }));

        case 6:
          res.json(product);
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);
          res.status(500).send("Server error");

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.get("/instructors/:id", auth, function _callee4(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.find({
            userId: req.params.id
          }));

        case 3:
          products = _context4.sent;
          res.json(products);
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);
          res.status(500).send("Server error");

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;