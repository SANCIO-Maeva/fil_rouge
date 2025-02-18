import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import MessagesValidator from '../../validators/MessagesValidator.js'; // Assurez-vous que le chemin est correct

dotenv.config();
const router = express.Router();
const prisma = new PrismaClient();

const validateMessage = (req, res, next) => {
    try {
        MessagesValidator.parse(req.body); // Validation des données du message
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
                content,
                timestamp: new Date(timestamp),
                userIdSender,
                userIdReceiver,
                announcementId,
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
            include: {
                sender: true,
                receiver: true,
                announcement: true,
            },
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des messages." });
    }
});

// Mettre à jour un message
router.put("/:id", validateMessage, async (req, res) => {
    const { id } = req.params;
    const { userIdSender, userIdReceiver, announcementId, content, timestamp } = req.body;

    try {
        const updatedMessage = await prisma.messages.update({
            where: { id_message: parseInt(id) },
            data: {
                content,
                timestamp: new Date(timestamp),
                userIdSender,
                userIdReceiver,
                announcementId,
                sender: {
                    connect: {
                        id_user: userIdSender,
                    },
                },
                receiver: {
                    connect: {
                        id_user: userIdReceiver,
                    },
                },
                announcement: {
                    connect: {
                        id_announcement: announcementId,
                    },
                },
            },
        });
        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du message :", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du message.", details: error.message });
    }
});

// Supprimer un message
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.messages.delete({
            where: { id_message: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error("Erreur lors de la suppression du message :", error);
        res.status(500).json({ error: "Erreur lors de la suppression du message.", details: error.message });
    }
});

export default router;