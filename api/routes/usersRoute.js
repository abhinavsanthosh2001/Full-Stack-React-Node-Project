import express from "express";
import {deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/authenticationTools.js";

const router = express.Router();

//r
router.get("/:id", verifyToken,verifyUser, getUser);
router.get("/", verifyToken, verifyAdmin, getUsers);
//u
router.put("/:id", verifyToken, verifyUser, updateUser);
//d
router.delete("/:id", verifyToken, verifyUser, deleteUser);

export default router