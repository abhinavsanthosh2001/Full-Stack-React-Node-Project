import User from "../models/UserModel.js"
import { createError } from "../utils/error.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error.status);
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const getuser = await User.findById(req.params.id);
        res.status(200).json(getuser);
    } catch (error) {
        next(error);
    }
}
export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await user.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updateUser);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return next(createError(404,"user Not Found"));
        } 
        res.status(200).json("user deleted");
    } catch (error) {
        next(error);
    }
}