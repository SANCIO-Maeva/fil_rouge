import { z } from 'zod';

const MessagesValidator = z.object({
    userIdSender: z.number().int().positive(),
    userIdReceiver: z.number().int().positive(),
    announcementId: z.number().int().positive(),
    content: z.string().min(1).max(500),
    timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Timestamp must be a valid ISO 8601 date",
    }),
});

export default MessagesValidator;