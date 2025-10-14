import foodPartnerModel from '../models/foodpartner.model.js'
import userModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'


async function authFoodPartnerMiddleware(req,res,next) {

    const token = req.cookies.token
    // console.log("Token:", token);

    if(!token){
        // console.log("No token found — sending 401")
        return res.status(401).json({
            message: "Please Login First"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // console.log("Decoded:", decoded);
        const foodPartner = await foodPartnerModel.findById(decoded.id)
        // console.log("Found partner:", foodPartner);
        req.foodPartner = foodPartner
        // console.log("Calling next()");
        next()
    } catch (error) {
        // console.error("JWT error:", error);
        return res.status(401).json({
            message: "Inavalid Token"
        })
    }
    
}

async function authUserMiddleware(req,res,next) {
    
    const token = req.cookies.token
    
    if(!token){
        
        return res.send(401).json({
            message:"Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        
        const user = await userModel.findById(decoded.id)
        
        req.user = user
        
        next()
    } catch (error) {
        
        return res.send(401).json({
            message:"Invalid tokken"
        })
    }
}

export default {authFoodPartnerMiddleware,authUserMiddleware}