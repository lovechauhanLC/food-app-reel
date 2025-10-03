import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import { response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

const registerUser = async (req,res) => {
    const {fullName,email,password} = req.body

    const isUserAlreadyExist = await userModel.findOne({
        email
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "user already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        fullName,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message: "user registered succesfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })


}

const loginUser = async (req,res) => {
    
}

export default {registerUser,loginUser}