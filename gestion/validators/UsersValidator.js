import { z } from "zod";

const UsersValidator = z.object({
  fullname: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom est trop long"),
  
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
    .optional(),
  
  longitude: z
    .number()
    .optional(),
  
  postal_code: z
    .string()
    .min(1, "Le code postal est requis"),
  bio: z
    .string()
    .min(1, "Une biographie est requise")
    .max(500, "La biographie est trop longue"),

  phone : z
    .string(),
});

export default UsersValidator;
