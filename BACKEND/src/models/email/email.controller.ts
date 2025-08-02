import { Response, Request } from "express";
import prisma from "../../utils/prisma";
import { sendEmailInput } from "./email.schema";

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const userData: sendEmailInput = req.body;
    const user = await prisma.email_submissions.create({
      data: userData,
      omit: {
        user_agent: true,
        ip: true,
      },
    });
    res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Please enter a valid email/ You have already entered your email",
    });
  }
};
