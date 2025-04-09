import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import MessagesValidator from '../../validators/MessagesValidator.js';

dotenv.config();
const router = express.Router();
const prisma = new PrismaClient();

const validateMessage = (req, res, next) => {
  try {
    MessagesValidator.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

// Créer un message
router.post('/', validateMessage, async (req, res) => {
  const { userIdSender, userIdReceiver, announcementId, content } = req.body;
  try {
    // Vérifier si les utilisateurs existent
    const [sender, receiver] = await Promise.all([
      prisma.users.findUnique({ where: { id_user: userIdSender } }),
      prisma.users.findUnique({ where: { id_user: userIdReceiver } }),
    ]);

    if (!sender || !receiver) {
      return res
        .status(400)
        .json({ error: "L'expéditeur ou le destinataire n'existe pas." });
    }

    // Vérifier ou créer une conversation
    let conversation = await prisma.conversations.findFirst({
      where: {
        OR: [
          { userSender: userIdSender, userReceiver: userIdReceiver },
          { userSender: userIdReceiver, userReceiver: userIdSender },
        ],
      },
    });

    if (!conversation) {
      conversation = await prisma.conversations.create({
        data: {
          userSender: userIdSender,
          userReceiver: userIdReceiver,
          announcementId,
        },
      });
    }

    // Créer le message
    const newMessage = await prisma.messages.create({
      data: {
        content,
        conversation: {
          connect: { id_conversation: conversation.id_conversation },
        },
        announcement: {
          connect: { id_announcement: announcementId },
        },
        sender: {
          connect: { id_user: userIdSender },
        },
        receiver: {
          connect: { id_user: userIdReceiver },
        },
      },
    });

    // Mettre à jour le dernier message de la conversation
    await prisma.conversations.update({
      where: { id_conversation: conversation.id_conversation },
      data: { lastMessageId: newMessage.id_message },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Erreur lors de la création du message :', error);
    res.status(500).json({ error: 'Erreur lors de la création du message.' });
  }
});

// Obtenir tous les messages d'un utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          { userIdSender: Number(req.params.userId) },
          { userIdReceiver: Number(req.params.userId) },
        ],
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages :', error);
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération des messages.' });
  }
});

// Obtenir tous les messages d'une discussion
router.get('/discussion/:userId1/:userId2', async (req, res) => {
  try {
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          {
            userIdSender: Number(req.params.userId1),
            userIdReceiver: Number(req.params.userId2),
          },
          {
            userIdSender: Number(req.params.userId2),
            userIdReceiver: Number(req.params.userId1),
          },
        ],
      },
      orderBy: { timestamp: 'asc' },
      include: {
        sender: { select: { id_user: true, firstname: true, name: true } },
        receiver: { select: { id_user: true, firstname: true, name: true } },
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération de la discussion :', error);
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération de la discussion.' });
  }
});

export default router;
