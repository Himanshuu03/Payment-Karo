const mongoose = require("mongoose");

const BankSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    balance:{
        type:Number,
        required:true
    }
})

const Bank = mongoose.model("Bank",BankSchema);

module.exports = {
    Bank
};