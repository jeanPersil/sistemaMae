import express from "express";

import userRouter from "./src/modules/user/userRoutes.js";
import cliRouter from "./src/modules/clients/clientsRoutes.js";

import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/client", cliRouter);

app.listen(port, () => {
  console.log(`O servidor esta rodando na porta ${port}`);
});
