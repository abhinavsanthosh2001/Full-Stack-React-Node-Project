import express from "express";
import Hotel from "../models/HotelModel.js"
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotelController.js";

const router = express.Router();

//c
router.post("/",createHotel);
//r
router.get("/:id", getHotel);

router.get("/", getHotels);
//u
router.put("/:id",updateHotel);
//d
router.delete("/:id",deleteHotel);

export default router   