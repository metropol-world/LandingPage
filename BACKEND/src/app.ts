import express from "express";
import { Response, Request } from "express";
import emailRouter from "./models/email/email.router";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api/email", emailRouter);
app.get("/healthcheck", (req: Request, res: Response) => {
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
