import express from "express";
import { getUserProfile, updateProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.put("/profile", protectRoute, updateProfile);
//update profile => auth
export default router;