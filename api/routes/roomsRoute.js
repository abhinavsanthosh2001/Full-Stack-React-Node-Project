import express from "express";
import { verifyAdmin, verifyToken } from "../utils/authenticationTools.js";
import { createRoom, getRoom, getRooms, updateRoom, deleteRoom } from "../controllers/roomController.js";

const router = express.Router();

//c
router.post("/:hotelid", verifyToken, verifyAdmin ,createRoom);
//r
router.get("/:id", getRoom);

router.get("/", getRooms);
//u
router.put("/:id", verifyToken, verifyAdmin, updateRoom);
//d
router.delete("/:id/:hotelid", verifyToken, verifyAdmin , deleteRoom);

export default router