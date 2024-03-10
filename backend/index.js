const express = require("express");
const dbConnect = require("./DataBase/database");
const mainRouter = require("./Routes/Routes");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const app = express();

// Using Global Middleware
app.use(express.json());
app.use(cors({ origin: true }));


app.get("/", (req, res) => {
    res.send("Hello server is running");
});

// Main Router for handling the request
app.use("/api/v1/", mainRouter);

// Connecting DataBase
dbConnect();

// Listening at PORT
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});
