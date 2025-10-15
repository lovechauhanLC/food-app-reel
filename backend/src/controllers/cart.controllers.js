import cartModel from '../models/cart.models.js'

async function addToCart(req,res) {
    try {
        const userId = req.body.user._id
        const {foodId} = req.user

        const cart = await cartModel.findOne({user: userId})

        if(!cart){
            cart  = new cartModel({user: userId, items: []}) 
        }

        const itemExists = cart.items.find(item => item.food.toString() === foodId)

        if(itemExists) {
            cart.items.push({food: foodId})
        }

        await cart.save()
        res.status(200).json({message: "Item Added To Cart"})

    } catch (error) {
        console.error("Error adding to cart: ",error)
        res.status(500).json({message: "Internal Server Error" })
    }
}

async function getCartItems(req,res) {
    try {
        const userId = req.body.userId
        const cart = await cartModel.findOne({user: userId}).populate('items.food')
        
        if(!cart) {
            return res.satuts(200).json({items: []})
        }

        res.status(200).json({items: cart.items})
    } catch (error) {
        console.error("Error getting from cart: ",error)
        res.status(500).json({message: "Internal Server Error" })
    }
}

export default {addToCart , getCartItems}