import { z } from "zod";

const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const sendEmailSchema = z.object({
  email: z
    .email({ message: "invalid email address" })
    .refine((email) => strictEmailRegex.test(email), {
      message: "Stricter format required",
    }),
});

export type sendEmailInput = z.infer<typeof sendEmailSchema>;
export default sendEmailSchema;
