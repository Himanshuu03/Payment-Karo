const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = async() =>{
    try {    
        await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected");
    } catch (error) {
        console.log(`Error in Data Base :-> ${error}`);
    }
}
module.exports = dbConnect;