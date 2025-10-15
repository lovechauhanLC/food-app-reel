import foodPartnerModel from "../models/foodpartner.model.js";
import foodModel from "../models/food.models.js"

async function getFoodPartnerId(req,res) {
    const foodPartnerId = req.params.id

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    const foodItemsByFoodPartner = await foodModel.find({foodPartner: foodPartnerId})

    if(!foodPartner){
        return res.status(404).json({
            message: "Food Partner did not found"
        })
    }

    res.status(200).json({
        message: "Food Partner Recieved Succesfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    })
}

export default {getFoodPartnerId}