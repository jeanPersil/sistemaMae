import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./src/middleware/errorMiddleware.js";
import { pageRouter } from "./src/routes/pages.js";

import userRouter from "./src/modules/user/userRoutes.js";
import cliRouter from "./src/modules/clients/clientsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/client", cliRouter);
app.use("/", pageRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`O servidor esta rodando na porta ${port}`);
});
