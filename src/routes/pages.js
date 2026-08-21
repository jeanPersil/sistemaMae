import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { authMiddleware } from "../middleware/authValidate.js";

const pageRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

pageRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

pageRouter.get("/cliente", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/clients.html"));
});

export { pageRouter };
