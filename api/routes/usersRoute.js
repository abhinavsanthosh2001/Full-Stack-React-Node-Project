import express from "express";
import {deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//r
router.get("/:id",verifyUser, getUser);
router.get("/",verifyAdmin, getUsers);
//u
router.put("/:id", verifyUser, updateUser);
//d
router.delete("/:id", verifyUser, deleteUser);

export default router