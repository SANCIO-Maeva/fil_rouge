import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import SkillsValidator from "../../validators/SkillsValidator.js";

dotenv.config();
const router = express.Router();
const prisma = new PrismaClient();

// Middleware de validation avec Zod
const validateSkill = (req, res, next) => {
  try {
    SkillsValidator.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

// Ajouter une compétence
router.post("/", validateSkill, async (req, res) => {
  const { name, description } = req.body;

  try {
    const newSkill = await prisma.skills.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(newSkill);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la compétence :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de la compétence." });
  }
});

// Récupérer toutes les compétences 
router.get("/", async (req, res) => {
  try {
    const skills = await prisma.skills.findMany();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des compétences." });
  }
});

// Récupérer les compétences d'un utilisateur
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const skills = await prisma.skills.findMany({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des compétences." });
  }
});

// Mettre à jour une compétence
router.put("/:id", validateSkill, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedSkill = await prisma.skills.update({
      where: { id_skill: parseInt(id) },
      data: { name, description },
    });
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour de la compétence." });
  }
});

// Supprimer une compétence
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.skills.delete({
      where: { id_skill: parseInt(id) },
    });
    res.status(200).json({ message: "Compétence supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression de la compétence." });
  }
});

export default router;
