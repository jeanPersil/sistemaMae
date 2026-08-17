import { Router } from "express";
import { UserController } from "./userController.js";
import { authMiddleware } from "../../middleware/authValidate.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/auth/signup", userController.signUp);
userRouter.post("/auth/login", userController.login);
userRouter.post("/auth/logout", userController.logout);

export default userRouter;
