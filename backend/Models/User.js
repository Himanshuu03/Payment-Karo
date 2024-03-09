const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    fName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    }
})
const User = mongoose.model("User",UserSchema);
module.exports= {
    User
}