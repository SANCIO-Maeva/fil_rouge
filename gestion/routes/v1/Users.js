import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import UsersValidator from "../../validators/UsersValidator.js"; 
import { locationAddress } from '../../utils/Locations.js';


const router = express.Router();
const prisma = new PrismaClient();

const validatedUser = (req, res, next) => {
  try {
    UsersValidator.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

// Route pour ajouter un utilisateur
router.post("/", async (req, res) => {
  let validatedUser;

  try {
    // Valider les données envoyées par le client avec le validateur UserValidator
    validatedUser = UsersValidator.parse(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.errors }); // Renvoie l'erreur si la validation échoue
  }

  try {
    // Vérifier si l'email ou le mot de passe existe déjà dans la base de données
    const existingUser = await prisma.users.findFirst({
      where: { OR: [
        { mail: validatedUser.mail },
        { phone: validatedUser.phone },
      ]},
    });

    if (existingUser) {
      return res.status(400).json({ error: "Cet email ou le numéro de téléphone est déjà utilisé." });
    }

    // Hacher le mot de passe avant de le sauvegarder
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

    // Géocoder l'adresse pour obtenir les coordonnées
    let coordinates = { latitude: null, longitude: null };
    if (validatedUser.address) {
      try {
        coordinates = await locationAddress(validatedUser.address);
      } catch (error) {
        return res.status(500).json({ error: "Erreur lors du géocodage de l'adresse.", details: error.message });
      }
    }

    // Créer l'utilisateur dans la base de données
    const newUser = await prisma.users.create({
      data: {
        name: validatedUser.name,
        firstname: validatedUser.firstname,
        mail: validatedUser.mail,
        password: hashedPassword,
        role: validatedUser.role,
        address: validatedUser.address,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        postal_code: validatedUser.postal_code,
        bio: validatedUser.bio,
        phone: validatedUser.phone,
      },
    });

    res.status(201).json({user:newUser}); // Renvoie le nouvel utilisateur créé
  } catch (prismaError) {
    console.error(prismaError);
    res.status(500).json({ error: "Une erreur est survenue lors de la création de l'employé." });
  }
});

// Obtenir tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
});

  // Obtenir un utilisateur par ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.users.findUnique({
        where: { id_user: parseInt(id) },
      });
      if (!user) return res.status(404).json({ error: "Utilisateur introuvable." });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur." });
    }
  });

  // Mettre à jour un utilisateur
  router.put("/:id", validatedUser, async (req, res) => {
    const { id } = req.params;
    const { mail, phone, bio, password } = req.body;
    try {
      const updatedUser = await prisma.users.update({
        where: { id_user: parseInt(id) },
        data: { mail, phone, bio, password },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
    }
  });
  
  // Supprimer un utilisateur
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.users.delete({
        where: { id_user: parseInt(id) },
      });
      res.status(200).json({ message: "Utilisateur supprimée avec succès." });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
    }
  });


export default router;
