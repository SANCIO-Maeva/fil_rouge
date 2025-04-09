import express from "express";
import { PrismaClient } from "@prisma/client";
import ConversationsValidator from "../../validators/ConversationsValidator.js";
import { onUpdated } from "vue";

const router = express.Router();
const prisma = new PrismaClient();

// Middleware pour valider les données de conversation
const validateConversation = (req, res, next) => {
  try {
    ConversationsValidator.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

// Obtenir toutes les conversations
router.get("/", async (req, res) => {
    try {
      const conversations = await prisma.conversations.findMany({
        include: {
          user1: {
            select: {
              firstname: true,
              name: true,
            },
          },
          user2: {
            select: {
              firstname: true,
              name: true,
            },
          },
        },
      });
      res.status(200).json(conversations);
    } catch (error) {
      console.error("Erreur lors de la récupération des conversations :", error);
      res.status(500).json({ error: "Erreur lors de la récupération des conversations." });
    }
  });

// Obtenir une conversation par ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const conversation = await prisma.conversations.findUnique({
            where: { id_conversation: parseInt(id) },
            include: {
                user1: { select: { firstname: true, name: true } },
                user2: { select: { firstname: true, name: true } },
            },
        });

        if (!conversation) {
            return res.status(404).json({ error: "Conversation introuvable." });
        }

        res.status(200).json({
            id: conversation.id_conversation,
            user1: conversation.user1,
            user2: conversation.user2,
            lastMessageId: conversation.lastMessageId,
            announcementId: conversation.announcementId,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération de la conversation :", error);
        res.status(500).json({ error: "Erreur lors de la récupération de la conversation." });
    }
});


// Obtenir toutes les conversations d'un utilisateur
router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const conversations = await prisma.conversations.findMany({
        where: {
          OR: [
            { userSender: parseInt(userId) }, // L'utilisateur est l'expéditeur
            { userReceiver: parseInt(userId) }, // L'utilisateur est le destinataire
          ],
        },
        include: {
          user1: {
            select: {
              id_user: true,
              firstname: true,
              name: true,
            },
          },
          user2: {
            select: {
              id_user: true,
              firstname: true,
              name: true,
            },
          },
          lastMessage: {
            select: {
                id_message: true,
                content: true,
                announcementId: true,
                timestamp: true,
            },
          },
        },
      });
  
      res.status(200).json(
        conversations.map(conversation => ({
            id_conversation: conversation.id_conversation,
            userSender: conversation.userSender,
            userReceiver: conversation.userReceiver,
            lastMessageId: conversation.lastMessageId,
            updatedAt: conversation.updatedAt,
            user1: conversation.user1,
            user2: conversation.user2,
            announcementId: conversation.announcementId,
            lastMessage: conversation.lastMessage ? {
              id_message: conversation.lastMessage.id_message,
              content: conversation.lastMessage.content,
              timestamp: conversation.lastMessage.timestamp,
            } : null,
        }))
    );
    
    } catch (error) {
      console.error("Erreur lors de la récupération des conversations de l'utilisateur :", error);
      res.status(500).json({ error: "Erreur lors de la récupération des conversations de l'utilisateur." });
    }
  });

// Supprimer une conversation
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.conversations.delete({
      where: { id_conversation: parseInt(id) },
    });

    res.status(200).json({ message: "Conversation supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la conversation :", error);
    res.status(500).json({ error: "Erreur lors de la suppression de la conversation." });
  }
});

export default router;