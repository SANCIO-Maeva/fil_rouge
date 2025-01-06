// src/routes/v1/auth/auth.js
import express from 'express';
import { PrismaClient } from '@prisma/client';  // Prisma pour interagir avec la base de données
import bcrypt from 'bcrypt';  // Importation de bcrypt pour le hachage des mots de passe

const router = express.Router();
const prisma = new PrismaClient();

// Route pour la connexion de l'utilisateur (authentification simple)
router.post('/login', async (req, res) => {
  const { mail, password } = req.body;  // Récupération des informations envoyées dans le corps de la requête

  if (!mail || !password) {
    return res.status(400).json({ message: 'Les identifiants sont requis.' });
  }

  try {
    // Recherche de l'utilisateur dans la base de données par son adresse mail
    const user = await prisma.users.findFirst({
      where: { mail }, // Recherche l'utilisateur par son adresse mail
    });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrect.' });
    }

    // Comparaison du mot de passe envoyé avec celui stocké en base (haché)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants incorrect.' });
    }

    // Connexion réussie, on retourne les informations de l'utilisateur
    return res.status(200).json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        name: user.name,
        mail: user.mail,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

export default router;
