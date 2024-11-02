import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { SuccessMessageDTO } from "../utils/successMessageDTO.js";

export const register = async (req, res, next) => {
    try {
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save();
        const response = SuccessMessageDTO(true, "User Created")
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            username:req.body.username
        })
        if(!user) return next(createError(404, "User Not Found!"))

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);  
        if(!isPasswordCorrect) return next(createError(400, "Incorrect Password!"));
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);
        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({otherDetails});
    } catch (error) {
        next(error);
    }
}
    