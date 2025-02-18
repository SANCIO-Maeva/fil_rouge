import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import UsersValidator from "../../validators/UsersValidator.js"; 
import { locationAddress } from '../../utils/Locations.js';


const router = express.Router();
const prisma = new PrismaClient();

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
    // Vérifier si l'email existe déjà dans la base de données
    const existingUser = await prisma.users.findUnique({
      where: {
        mail: validatedUser.mail,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé." });
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
        city: validatedUser.city,
        country: validatedUser.country,
      },
    });

    res.status(201).json(newUser); // Renvoie le nouvel utilisateur créé
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

export default router;
