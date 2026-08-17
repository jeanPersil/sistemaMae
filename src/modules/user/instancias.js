import { UserRepository } from "../../banco/repository/userRepository.js";
import { UserService } from "./userService.js";
import { UserController } from "./userController.js";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export default userController;
