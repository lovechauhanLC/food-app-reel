import express from 'express'
import foodPartnerController from '../controllers/foodPartner.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = express.Router()

router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerId
)

export default router