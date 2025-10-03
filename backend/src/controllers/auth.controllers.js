import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import { response } from "express";
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        email
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "user already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered succesfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })


}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "invalid email"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "user logged in succesfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

const logoutUser = async (req,res) => {
    res.clearCookie("token")
    res.status(200).json({
        message:"user logedout successfully"
    })
}

export default { registerUser, loginUser ,logoutUser}