import { Router, Request, Response } from "express";
import sendEmail from "./email.controller";

const emailRouter = Router();

emailRouter.use("/sendEmail", sendEmail);

export default emailRouter;
