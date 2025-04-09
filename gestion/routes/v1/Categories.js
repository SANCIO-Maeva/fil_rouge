import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import CategoriesValidator from "../../validators/CategoriesValidator.js";

dotenv.config();
const router = express.Router();

const prisma = new PrismaClient();

const validateCategorie = (req, res, next) => {
    try {
        CategoriesValidator.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  };
  
/// Créer une catégorie
router.post("/", validateCategorie, async (req, res) => {
  const { name } = req.body;
  try {
    const newCategorie = await prisma.categories.create({
      data: {
        name,
      },
    });
    res.status(201).json(newCategorie);
  } catch (error) {
    console.error("Erreur lors de la création de la catégorie :", error);
    res.status(500).json({ error: "Erreur lors de la création de la catégorie", details: error.message });
  }
});

// Obtenir toutes les catégories
router.get("/", async (req, res) => {
  try {
    const categories = await prisma.categories.findMany();
    res.status(200).json(categories.map((categorie) => {
      return {
        id: categorie.id_categorie,
        ...categorie,
      };
    }
    ));
    } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des catégories." });
  }
});
  
  // Obtenir une catégorie par ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const categorie = await prisma.categories.findUnique({
        where: { id_categorie: parseInt(id) },
      });
      if (!categorie) return res.status(404).json({ error: "Annonce introuvable." });
      res.status(200).json(categories.map((categorie) => {
        return {
          id: categorie.id_categorie,
          ...categorie,
        };
      }
      ));    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération de l'annonce." });
    }
  });

export default router;
