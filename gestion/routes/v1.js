import express from "express";
import cors from "cors";
import UsersRouter from "./v1/Users.js";
import SkillsRouter from "./v1/Skills.js";
import AnnouncementsRouter from "./v1/Announcements.js";
import MessagesRouter from "./v1/Messages.js";
import AuthRouter from './v1/auth/auth.js';


const router = express.Router();
app.use(express.json());
app.use(cors());

router.use("/users", UsersRouter);
router.use("/skills", SkillsRouter);
router.use("/announcements", AnnouncementsRouter);
router.use("/messages", MessagesRouter);
router.use('/auth', AuthRouter);  


export default router;

