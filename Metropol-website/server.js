// server.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import { GoogleAuth } from "google-auth-library";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const backendUrl = process.env.BACKEND_URL; // <-- set this in Cloud Run

// Google Auth client
const auth = new GoogleAuth();

async function attachAuthToken(req, res, next) {
  try {
    console.log("trying to auth");
    const client = await auth.getIdTokenClient(backendUrl);
    const client_headers = await client.getRequestHeaders();
    req.headers["authorization"] = client_headers.get("authorization");
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).send("Auth error");
  }
}

// Proxy API calls to backend with auth
app.use(
  "/api",
  attachAuthToken,
  createProxyMiddleware({
    target: `${backendUrl}/api`,
    changeOrigin: true,
  })
);

// Serve the React build
app.use(express.static(path.join(__dirname, "build")));

// All other routes → React app (for SPA routing)
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
