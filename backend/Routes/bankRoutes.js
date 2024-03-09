const express = require("express");
const userMiddleware = require("../Middlewares/userMiddleware");
const { Bank } = require("../Models/Bank");
const { default: mongoose } = require("mongoose");
const { User } = require("../Models/User");
const bankRoutes = express.Router();

bankRoutes.get("/",userMiddleware,async(req,res)=>{
    try {   
        const accountBalance = await Bank.findOne({userId:req.userId});
        res.json({
            msg:"fetch succesfully",
            balance:accountBalance.balance
        })
    } catch (error) {
        console.log("Error in accountBalnce");
    }
})

bankRoutes.post("/transfer",userMiddleware,async(req,res)=>{
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const {amount,to} = req.body;
        const senderAccount = await Bank.findOne({userId:req.userId}).session(session);
        if(!senderAccount || senderAccount.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                msg:"Insufficient balance"
            });
        }
        const reciverAccount = await Bank.findOne({userId:to}).session(session);
        if(!reciverAccount){
            await session.abortTransaction();
            return res.status(400).json({
                msg:"Invalid Account"
            });
        }
        await Bank.updateOne({userId:req.userId},{
            $inc:{
                balance : -amount
            }
        }).session(session);
        await Bank.updateOne({userId:to},{
            $inc:{
                balance : amount
            }
        }).session(session);

        await session.commitTransaction();
        res.json({
            msg:"Transfer Succesfully"
        })
    } catch (error) {
        console.log("Error in transfer Route");
    }
})

bankRoutes.get("/getBalance",userMiddleware,async(req,res)=>{
    try {
        const account = await Bank.findOne({userId:req.userId});
        const user = await User.findOne({_id:req.userId});
        res.json({
            msg:"Your Balance",
            balance:account.balance,
            name:user.fName,
            id:user._id,
        })
    } catch (error) {
        res.json({
            msg:"error in getBalance"
        })
    }
})

module.exports = bankRoutes;