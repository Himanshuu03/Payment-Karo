const express = require("express");
const userRoutes = require("./userRoutes");
const bankRoutes = require("./bankRoutes");
const Route = express.Router();


//Creating User Routes
Route.use("/user",userRoutes);
Route.use("/bank",bankRoutes);


module.exports = Route;