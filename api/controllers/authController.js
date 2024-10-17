import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";

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
        res.status(201).send("User has been created");
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            username:req.body.username
        })
        console.log(user);
        if(!user) return next(createError(404, "User Not Found!"))

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);  
        if(!isPasswordCorrect) return next(createError(400, "Incorrect Password!"))
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
    