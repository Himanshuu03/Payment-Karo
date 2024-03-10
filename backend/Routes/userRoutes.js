const express = require("express");
const userRoutes = express.Router();
const zod = require("zod");
const { User } = require("../Models/User");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../Middlewares/userMiddleware");
const { Bank } = require("../Models/Bank");
require("dotenv").config();

const signupSchema = zod.object({
    fName: zod.string(),
    lName: zod.string(),
    email: zod.string().email(),
    password:zod.string()
})

const updateSchema = zod.object({
    fName: zod.string(),
    lName: zod.string(),
    password:zod.string()
})
const jwtKey = process.env.JWT_KEY;

userRoutes.post("/signup", async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Email already taken / Incorrect Input",
        })
    }  
    try {   
        const checkUser = await User.findOne({ email: body.email });
        if(checkUser !== null){
            return res.status(411).json({
                msg:"Email already taken / Incorrect Input",
            })
        }
    } catch (error) {
        console.log("Error in checkUser");
    }

    try {  
        const newUser = await User.create(body);
        const userId = newUser._id;
        try {
            await Bank.create({
                userId,
                balance: 1+Math.random()*10000
            })
        } catch (error) {
            console.log("Error in creating Bank Account"); 
        }
        const token = jwt.sign({
            userId : newUser._id,
            username:newUser.email,
        },jwtKey)
        res.json({
            msg:"User Created Successfully",
            token
        })
    } catch (error) {
        console.log("Error in newUser"+error);
    }
})


userRoutes.post("/signin",async (req,res)=>{
    const body = req.body;
    try {    
        const checkUser = await User.findOne({email:body.email});
        if(checkUser !== null){
            if(checkUser.password === body.password){
                const token = jwt.sign({
                    userId:checkUser._id,
                    username:checkUser.email
                },jwtKey)
                return res.json({
                    token
                })
            }else{
                return res.status(411).json({
                    msg:"Invalid Credentials"
                })
            }
        }else{
            res.status(411).json({
                msg:"Error while logging In / User does'nt exist"
            })
        }
    } catch (error) {
        console.log("Error in checkUser" + error);
    }
})

userRoutes.put("/",userMiddleware,async(req,res)=>{
    const body = req.body;
    const {success} = updateSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            msg:"Incorrect Input Error while updating",
        })
    }
    try{
        const updateUser = await User.updateOne({_id:req.userId},{...body});
        console.log(updateUser);
        res.json({
            msg:"Updated Successfully",
        })
    }catch(error){
        return res.status(411).json({
            msg:"Error while Updated User",
        })
    }
})

userRoutes.get("/bulk",userMiddleware,async(req,res)=>{
    const filter = req.query.filter || "";
    try {  
        const users = await User.find({
            $or :[{
                fName :{
                    "$regex" : filter
                }
            },{
                lName:{
                     "$regex" : filter  
                 }
            }]
        })
        res.json({
            user:users.map((user)=>{
                return{
                    fName:user.fName,
                    lName:user.lName,
                    email:user.email,
                    _id:user._id
                }
            })
        })
    } catch (error) {
        console.log("Error in Bulk");
    }
})
userRoutes.get("/",userMiddleware,async(req,res)=>{
    res.json({
        msg:true,
    })
})

userRoutes.get("/:id",async(req,res)=>{
    const id = req.params.id;
    const user = await User.findOne({_id:id})
    res.json({
        user,
    })
})

module.exports = userRoutes