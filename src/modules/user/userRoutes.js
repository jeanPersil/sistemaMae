import { Router } from "express";
import { authMiddleware } from "../../middleware/authValidate.js";
import userController from "./instancias.js";

const userRouter = Router();

userRouter.post("/auth/signup", userController.signUp);
userRouter.post("/auth/login", userController.login);
userRouter.post("/auth/logout", userController.logout);

export default userRouter;
