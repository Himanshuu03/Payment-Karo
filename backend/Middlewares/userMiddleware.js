const jwt = require("jsonwebtoken")
require("dotenv").config();

const jwtKey = process.env.JWT_KEY;

const userMiddleware = (req,res,next) =>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token || token.startsWith('Bearer ')){
        return res.status(403).json({
            msg:"Error in UserMiddleware - Token Check"
        })
    }
    try {
        const decoded = jwt.verify(token,jwtKey);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({
            msg:"Error in UserMiddleware"
        })
    }
}

module.exports = userMiddleware;