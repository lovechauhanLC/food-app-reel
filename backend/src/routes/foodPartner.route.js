import express from 'express'
import foodPartnerController from '../controllers/foodPartner.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerId
)

export default router