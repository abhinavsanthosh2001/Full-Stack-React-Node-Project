import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//c
router.post("/", verifyAdmin ,createHotel);
//r
router.get("/:id", getHotel);

router.get("/", getHotels);
//u
router.put("/:id", verifyAdmin, updateHotel);
//d
router.delete("/:id",verifyAdmin , deleteHotel);

export default router   