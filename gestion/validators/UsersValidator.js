import { z } from "zod";

const UsersValidator = z.object({
  name: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom est trop long"),
  
  firstname: z
    .string()
    .min(1, "Le prénom est requis")
    .max(100, "Le prénom est trop long"),
  
  mail: z
    .string()
    .email("L'adresse mail n'est pas valide")
    .max(100, "L'adresse mail est trop longue"),
  
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Le mot de passe doit inclure au moins une majuscule, un chiffre et un caractère spécial"
    ),
  
  role: z.enum(["Admin", "Agent"], {
    errorMap: () => ({
      message: "Le rôle doit être Admin ou Agent",
    }),
  }),
  
  address: z
  .string()
  .min(1, "L'adresse est requise"),
  
  latitude: z
    .number()
    .min(-90, "La latitude doit être entre -90 et 90")
    .max(90, "La latitude doit être entre -90 et 90")
    .optional(), // Optionnel, car certains utilisateurs peuvent ne pas avoir de localisation
  
  longitude: z
    .number()
    .min(-180, "La longitude doit être entre -180 et 180")
    .max(180, "La longitude doit être entre -180 et 180")
    .optional(), // Optionnel aussi
  
  city: z
    .string()
    .min(1, "La ville est requise")
    .max(100, "Le nom de la ville est trop long")
    .optional(), // Optionnel si tu ne veux pas obliger ce champ
  
  country: z
    .string()
    .min(1, "Le pays est requis")
    .max(100, "Le nom du pays est trop long")
    .optional(), // Optionnel également
});

export default UsersValidator;
