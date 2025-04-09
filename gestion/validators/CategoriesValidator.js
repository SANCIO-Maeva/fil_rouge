import { z } from 'zod';

const CategoriesValidator = z.object({
    name: z.string(),
});

export default CategoriesValidator;