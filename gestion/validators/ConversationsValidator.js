import { z } from 'zod';

const ConversationsValidator = z.object({
    userId1: z.number().int().positive(), 
    userId2: z.number().int().positive(), 
});

export default ConversationsValidator;