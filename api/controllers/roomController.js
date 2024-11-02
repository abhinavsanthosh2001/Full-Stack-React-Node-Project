import Room from "../models/RoomModel.js"
import Hotel from "../models/HotelModel.js"
import { createError } from "../utils/error.js";
import { SuccessMessageDTO } from "../utils/successMessageDTO.js";

export const createRoom = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelid;
        const room = new Room(req.body);
        const savedRoom = await room.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id}
            });
        }
        catch (err){
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.log(error.status);
        next(error);
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const getRoom = await Hotel.findById(req.params.id);
        res.status(200).json(getRoom);
    } catch (error) {
        next(error);
    }
}
export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, 
            {$set: req.body},
            {new:true});
        res.status(200).json(updateRoom);
    } catch (error) {
        next(error);
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelid;

        const deleted = await Room.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return next(createError(404,"Room Not Found"));
        }
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id}
            });
            
        }
        catch (err){
            next(err);
        }

        const response = SuccessMessageDTO(true, "Room deleted")
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}