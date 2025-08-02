import express from "express";
import emailRouter from "./models/email/email.router";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/", emailRouter);

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
