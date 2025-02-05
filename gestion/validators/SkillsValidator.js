import { z } from "zod";

const SkillsValidator = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().optional(),
  userId: z.number().int().positive(),
});

export default SkillsValidator;
