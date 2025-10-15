import express from 'express'
import foodController from '../controllers/food.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import multer from 'multer'

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood
)

router.get('/',
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
)

router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood
)

router.get('/like',
    authMiddleware.authUserMiddleware,
    foodController.getLikedFood
)

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)

router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
)



export default router