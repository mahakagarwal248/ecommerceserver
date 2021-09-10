"use strict";

var express = require("express");

var app = express();

var cors = require("cors");

var morgan = require("morgan");

var connectDB = require("./config/db");

var PORT = process.env.PORT || 5000;
app.use(cors());
app.use(morgan("dev"));
connectDB();
app.use(express.json({
  extended: false
}));
app.use("/api/users", require("./routes/userAPI"));
app.use("/api/products", require("./routes/productsAPI"));
app.use("/api/auth", require("./routes/authAPI"));
app.use("/api/profile", require("./routes/ProfileAPI"));
app.get("/", function (req, res) {
  res.send("App is up");
});
app.listen(PORT, function () {
  console.log("Server is listening at port ".concat(PORT));
});