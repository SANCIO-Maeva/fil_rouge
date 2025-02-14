import { z } from 'zod';

const UserSkillsValidator = z.object({
    userId: z.number().int().positive(),
    skillId: z.number().int().positive(),
});

export default UserSkillsValidator;