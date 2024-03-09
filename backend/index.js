//Exporting Dependency
const express = require("express");
require("dotenv").config();
const dbConnect = require("./DataBase/database");
const mainRouter = require("./Routes/Routes");
const cors = require("cors")

//Using Dependency
const PORT = process.env.PORT || 4000;
const app = express();


//Using Global Middleware
app.use(express.json());
app.use(cors({ origin: true }));

app.use(cors({
    origin: 'https://payment-karo-c2g4.vercel.app',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));

app.get("/",(req,res)=>{
    res.send("Hello server is running");
})

//Main Router for handling the request
app.use("/api/v1/",mainRouter);

//Connectting DataBase
dbConnect();

//Listing at PORT
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})


