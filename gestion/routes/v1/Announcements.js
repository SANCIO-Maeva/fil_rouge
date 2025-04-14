import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import AnnouncementsValidator from "../../validators/AnnouncementsValidator.js";

dotenv.config();
const router = express.Router();

const prisma = new PrismaClient();

const validateAnnouncement = (req, res, next) => {
    try {
      AnnouncementsValidator.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  };
  
  // Créer une annonce
  router.post("/", validateAnnouncement, async (req, res) => {
    const { title, description, userId, image, categoryId } = req.body;
    try {
      const newAnnouncement = await prisma.announcements.create({
        data: {
          title,
          description,
          image,
          user: {
            connect: {
              id_user: userId,
            },
          },
          category: {
            connect: {
              id_category: categoryId, 
            },
          },
        },
      });
      res.status(201).json(newAnnouncement);
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce :", error);
      res.status(500).json({ error: "Erreur lors de la création de l'annonce.", details: error.message });
    }
  });

// Obtenir toutes les annonces
router.get("/", async (req, res) => {
  const { userId } = req.query; 
  try {
    const announcements = await prisma.announcements.findMany({});
    res.status(200).json(
      announcements.map((announcement) => {
        return {
          id: announcement.id_announcement,
          ...announcement,
        };
      })
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des annonces." });
  }
});
  
  // Obtenir une annonce par ID 
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const announcement = await prisma.announcements.findUnique({
        where: { id_announcement: parseInt(id) },
      });
      if (!announcement) return res.status(404).json({ error: "Annonce introuvable." });
      res.status(200).json(announcements.map((announcement) => {
        return {
          id: announcement.id_announcement,
          ...announcement,
        };
      }
      ));    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération de l'annonce." });
    }
  });

  // Obtenir les annonces par ID de l'utilisateur
  router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const announcements = await prisma.announcements.findMany({
        where: { userId: parseInt(userId) },
      });
      if (!announcements || announcements.length === 0) {
        return res.status(404).json({ error: "Aucune annonce trouvée pour cet utilisateur." });
      }
      res.status(200).json(announcements.map((announcement) => {
        return {
          id: announcement.id_announcement,
          ...announcement,
        };
      }
      ));
    } catch (error) {
      console.error("Erreur serveur:", error);
      res.status(500).json({ error: "Erreur lors de la récupération des annonces." });
    }
  });

    // Obtenir les annonces par ID de la catégorie
    router.get("/category/:categoryId", async (req, res) => {
      const { categoryId } = req.params;
      try {
        const announcements = await prisma.announcements.findMany({
          where: { categoryId: parseInt(categoryId) },
        });
        if (!announcements || announcements.length === 0) {
          return res.status(404).json({ error: "Aucune annonce trouvée pour cette catégorie." });
        }
        res.status(200).json(announcements.map((announcement) => {
          return {
            id: announcement.id_announcement,
            ...announcement,
          };
        }
        ));
      } catch (error) {
        console.error("Erreur serveur:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des annonces." });
      }
    });
  
  
  // Mettre à jour une annonce
  router.put("/:id", validateAnnouncement, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const updatedAnnouncement = await prisma.announcements.update({
        where: { id_announcement: parseInt(id) },
        data: { title, description},
      });
      res.status(200).json(updatedAnnouncement);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'annonce." });
    }
  });
  
  // Supprimer une annonce
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.announcements.delete({
        where: { id_announcement: parseInt(id) },
      });
      res.status(200).json({ message: "Annonce supprimée avec succès." });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'annonce." });
    }
  });

export default router;
