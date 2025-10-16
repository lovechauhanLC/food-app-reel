import cartModel from '../models/cart.models.js'

async function addToCart(req, res) {
    try {
        const userId = req.user._id
        const { items } = req.body

        if (!items || !items.length) {
            return res.status(400).json({ save: false });
        }

        const { food: foodId, quantity = 1 } = items[0];

        let cart = await cartModel.findOne({ user: userId })

        if (!cart) {
            cart = new cartModel({ user: userId, items: [] })
        }

        const itemExists = cart.items.find(item => item.food.toString() === foodId)

        if (itemExists) {
            itemExists.quantity += quantity;
        } else {
            cart.items.push({ food: foodId, quantity })
        }

        await cart.save()
        res.status(200).json({ save: true });

    } catch (error) {
        console.error("Error adding to cart: ", error)
        res.status(500).json({ save: false });
    }
}

async function getCartItems(req, res) {
    try {
        const userId = req.user._id
        const cart = await cartModel.findOne({ user: userId }).populate('items.food')

        if (!cart) {
            return res.status(200).json({ items: [] })
        }

        const cartItemIds = cart.items.map(i => i.food._id.toString());
        res.status(200).json({ items: cartItemIds });
    } catch (error) {
        console.error("Error getting from cart: ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export default { addToCart, getCartItems }