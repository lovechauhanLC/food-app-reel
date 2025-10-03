import express from "express";
import authController from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.post("/user/logout", authController.logoutUser);

router.post("/foodpartner/register", authController.registeFoodPartner);
router.post("/foodpartner/login", authController.loginFoodPartner);
router.post("/foodpartner/logout", authController.logoutFoodPartner);

export default router;
