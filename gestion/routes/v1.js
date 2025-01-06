import express from "express";

import UsersRouter from "./v1/Users.js";
import AnnouncementsRouter from "./v1/Announcements.js";
import authRouter from './v1/auth/auth.js';


const router = express.Router();

router.use("/users", UsersRouter);
router.use("/announcements", AnnouncementsRouter);
router.use('/auth', authRouter);  


export default router;
