import express from "express";
import cors from "cors";
import UsersRouter from "./v1/Users.js";
import AnnouncementsRouter from "./v1/Announcements.js";
import MessagesRouter from "./v1/Messages.js";
import AuthRouter from './v1/auth/auth.js';
import ConversationsRouter from "./v1/Conversations.js";
import CategoriesRouter from "./v1/Categories.js";

const router = express.Router();
router.use(express.json());
router.use(cors());

router.use("/users", UsersRouter);
router.use("/announcements", AnnouncementsRouter);
router.use("/messages", MessagesRouter);
router.use('/auth', AuthRouter); 
router.use("/conversations", ConversationsRouter);
router.use("/categories", CategoriesRouter);

export default router;

