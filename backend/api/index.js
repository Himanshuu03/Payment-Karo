const express = require("express");
const dbConnect = require("../DataBase/database");
const mainRouter = require("../Routes/Routes");
var cors = require('cors')


const PORT = process.env.PORT || 4000;
const app = express();

// Using Global Middleware
app.use(express.json());
app.use(cors());


// Logging middleware for testing purposes
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Main Router for handling the request
app.use("/api/v1/", mainRouter);

// Connecting to the Database
dbConnect();

// Listening at PORT
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
