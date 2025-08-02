import { z } from "zod";

const sendEmailSchema = z.object({
  email: z.email({ message: "invalid email address" }),
});

export type sendEmailInput = z.infer<typeof sendEmailSchema>;
