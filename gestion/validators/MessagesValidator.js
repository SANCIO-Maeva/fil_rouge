import { z } from 'zod';

const MessageValidator = z.object({
    userIdSender: z.number().int().positive().nonempty(),
    userIdReceiver: z.number().int().positive().nonempty(),
    announcementId: z.number().int().positive().nonempty(),
    content: z.string().min(1).max(500),
    timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Timestamp must be a valid ISO 8601 date",
    }),
});

export default MessageValidator;
