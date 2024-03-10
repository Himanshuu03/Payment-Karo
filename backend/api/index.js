const express = require("express");
const dbConnect = require("../DataBase/database");
const mainRouter = require("../Routes/Routes");
// const cors = require("cors");

const PORT = process.env.PORT || 4000;
const app = express();

// Using Global Middleware
app.use(express.json());
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });
    next();
});

// CORS Configuration
// app.use(cors({
//   origin: 'https://payment-karo-c2g4.vercel.app',
//   methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//   credentials: true,
// }));

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
