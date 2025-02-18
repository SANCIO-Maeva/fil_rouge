import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import UserSkillsValidator from '../../validators/UserSkillsValidator.js'; // Assurez-vous que le chemin est correct


dotenv.config();
const router = express.Router();
const prisma = new PrismaClient();

const validateUserSkill = (req, res, next) => {
  try {
      UserSkillsValidator.parse(req.body); // Validation des données de la compétence utilisateur
      next();
  } catch (error) {
      res.status(400).json({ error: error.errors });
  }
};

// Créer une compétence utilisateur
router.post("/", async (req, res) => {
  const { userId, skillId } = req.body;

  try {
    const newUserSkill = await prisma.userSkills.create({
      data: {
        userId,
        skillId,
      },
    });
    res.status(201).json(newUserSkill);
  } catch (error) {
    console.error("Erreur lors de la création de la compétence utilisateur :", error);
    res.status(500).json({ error: "Erreur lors de la création de la compétence utilisateur.", details: error.message });
  }
});

// Obtenir toutes les compétences utilisateur
router.get("/", async (req, res) => {
  try {
    const userSkills = await prisma.userSkills.findMany({
      include: { user: true, skill: true },
    });
    res.status(200).json(userSkills);
  } catch (error) {
    console.error("Erreur lors de la récupération des compétences utilisateur :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des compétences utilisateur." });
  }
});

// Mettre à jour une compétence utilisateur
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, skillId } = req.body;

  try {
    const updatedUserSkill = await prisma.userSkills.update({
      where: { id: parseInt(id) },
      data: {
        userId,
        skillId,
      },
    });
    res.status(200).json(updatedUserSkill);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la compétence utilisateur :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de la compétence utilisateur.", details: error.message });
  }
});

// Supprimer une compétence utilisateur
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.userSkills.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression de la compétence utilisateur :", error);
    res.status(500).json({ error: "Erreur lors de la suppression de la compétence utilisateur.", details: error.message });
  }
});

export default router;