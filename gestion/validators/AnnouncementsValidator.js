import { z } from "zod";

const AnnouncementsValidator = z.object({
    title: z.string().min(1, "Le titre est requis."),
    description: z.string().min(1, "La description est requise."),
  });

export default AnnouncementsValidator;
