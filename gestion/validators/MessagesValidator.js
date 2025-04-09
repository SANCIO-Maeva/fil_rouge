import { z } from 'zod';

const MessagesValidator = z.object({
    userIdSender: z.number().int().positive(),
    userIdReceiver: z.number().int().positive(),
    content: z.string().min(1).max(500),
});

export default MessagesValidator;