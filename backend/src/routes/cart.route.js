import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import cartControllers from '../controllers/cart.controllers.js'


const router = express.Router()


router.post('/',
    authMiddleware.authUserMiddleware,
    cartControllers.addToCart
)


router.get('/',
    authMiddleware.authUserMiddleware,
    cartControllers.getCartItems
)

export default router