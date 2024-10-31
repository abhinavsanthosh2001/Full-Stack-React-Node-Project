import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin, verifyToken } from "../utils/authenticationTools.js";

const router = express.Router();

//c
router.post("/", verifyToken, verifyAdmin ,createHotel);
//r
router.get("/:id", getHotel);

router.get("/", getHotels);
//u
router.put("/:id", verifyToken, verifyAdmin, updateHotel);
//d
router.delete("/:id", verifyToken, verifyAdmin , deleteHotel);

export default router   