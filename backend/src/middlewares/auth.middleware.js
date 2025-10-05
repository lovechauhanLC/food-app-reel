import foodPartnerModel from '../models/foodpartner.model.js'
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
        console.error("JWT error:", error);
        return res.status(401).json({
            message: "Inavalid Token"
        })
    }
    
}

export default {authFoodPartnerMiddleware}