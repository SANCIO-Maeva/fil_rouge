import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import MessageValidator from "../../validators/MessageValidator.js"; 

dotenv.config();
const router = express.Router();

const prisma = new PrismaClient();

const validateMessage = (req, res, next) => {
    try {
        MessageValidator.parse(req.body); // Validation des données du message
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
};

// Créer un message
router.post("/", validateMessage, async (req, res) => {
    const { userIdSender, userIdReceiver, announcementId, content, timestamp } = req.body;

    try {
        const newMessage = await prisma.messages.create({
            data: {
                userIdSender,
                userIdReceiver,
                announcementId,
                content,
                timestamp,
            },
        });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Erreur lors de la création du message :", error);
        res.status(500).json({ error: "Erreur lors de la création du message.", details: error.message });
    }
});

// Obtenir tous les messages
router.get("/", async (req, res) => {
    try {
        const messages = await prisma.messages.findMany({
            include: { userSender: true, userReceiver: true, announcement: true },
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des messages." });
    }
});

// Obtenir un message par ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const message = await prisma.messages.findUnique({
            where: { id_message: parseInt(id) },
            include: { userSender: true, userReceiver: true, announcement: true },
        });
        if (!message) return res.status(404).json({ error: "Message introuvable." });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du message." });
    }
});

// Mettre à jour un message
router.put("/:id", validateMessage, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const updatedMessage = await prisma.messages.update({
            where: { id_message: parseInt(id) },
            data: { content },
        });
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du message." });
    }
});

// Supprimer un message
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.messages.delete({
            where: { id_message: parseInt(id) },
        });
        res.status(200).json({ message: "Message supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du message." });
    }
});

export default router;
