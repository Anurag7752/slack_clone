import express from "express";

import router from  express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

router.get("/token", protectRoute, getStreamToken);

export default router;