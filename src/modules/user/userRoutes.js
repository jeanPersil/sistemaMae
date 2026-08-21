import { Router } from "express";
import { authMiddleware } from "../../middleware/authValidate.js";
import userController from "./instancias.js";

const userRouter = Router();

userRouter.post("/auth/login", userController.login);
userRouter.get("/auth/logout", userController.logout);

export default userRouter;
