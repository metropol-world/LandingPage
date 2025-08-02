import { Router } from "express";
import { sendEmail } from "./email.controller";

const emailRouter = Router();

emailRouter.post("/sendEmail", sendEmail);

export default emailRouter;
