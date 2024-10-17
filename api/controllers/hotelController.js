import Hotel from "../models/HotelModel.js"
import { createError } from "../utils/error.js";

export const createHotel = async (req, res, next) => {
    try {
        const newHotel = new Hotel(req.body)
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        next(error);
    }
}
export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        console.log(error.status);
        next(error);
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id);
        res.status(200).json(getHotel);
    } catch (error) {
        next(error);
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updateHotel);
    } catch (error) {
        next(error);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        const deleted = await Hotel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return next(createError(404,"Hotel Not Found"));
        }
        
        res.status(200).json("Hotel deleted");
    } catch (error) {
        next(error);
    }
}