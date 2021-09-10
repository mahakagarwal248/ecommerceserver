"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ProductSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    "default": Date.now()
  },
  updated: {
    type: Date,
    "default": Date.now()
  }
});
var Products = mongoose.model("Product", ProductSchema);
module.exports = Products;