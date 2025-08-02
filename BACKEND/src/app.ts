import express from "express";
import emailRouter from "./models/email/email.router";

const app = express();

app.use("/api/", emailRouter);

app.listen(8080, () => {
  console.log("App is live!");
});
