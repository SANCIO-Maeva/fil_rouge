import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import UserValidator from "../../validators/EmployeesValidator.js"

const router = express.Router();
const prisma = new PrismaClient();

// Route pour ajouter un employé
router.post("/", async (req, res) => {
  let validatedUser;

  try {
    // Valider les données envoyées par le client avec le validateur UserValidator
    validatedUser = UserValidator.parse(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.issues });
  }

  try {
    // Hacher le mot de passe avant de le sauvegarder
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

    const entry = await prisma.users.create({
      data: {
        name: validatedUser.name,
        firstname: validatedUser.firstname,
        mail: validatedUser.mail,
        password: hashedPassword,
        role: validatedUser.role,
      },
    });

    res.status(201).json(entry);
  } catch (prismaError) {
    console.error(prismaError);
    res.status(500).json({ error: "Une erreur est survenue lors de la création de l'employé." });
  }
});

export default router;
