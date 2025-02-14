import express from "express";
import cors from "cors";
import UsersRouter from "./v1/Users.js";
import SkillsRouter from "./v1/Skills.js";
import AnnouncementsRouter from "./v1/Announcements.js";
import MessagesRouter from "./v1/Messages.js";
import AuthRouter from './v1/auth/auth.js';
import userSkillsRouter from './v1/UserSkills.js';


const router = express.Router();
router.use(express.json());
router.use(cors());

router.use("/users", UsersRouter);
router.use("/skills", SkillsRouter);
router.use("/userSkills", userSkillsRouter);
router.use("/announcements", AnnouncementsRouter);
router.use("/messages", MessagesRouter);
router.use('/auth', AuthRouter);  


export default router;

