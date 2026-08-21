import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "./entity/userEntity.js";
import { AppError } from "../../erro.js";
import "dotenv/config";

export class UserService {
  constructor(UserRepository) {
    this.userRepo = UserRepository;
  }

  async login({ email, password }) {
    const userData = await this.userRepo.login(email);

    if (!userData) {
      throw new AppError({
        message: "Usuario ou senha incorretos",
        statusCode: 401,
      });
    }

    const match = await bcrypt.compare(password, userData.senha);

    if (!match) {
      throw new AppError({
        message: "Usuario ou senha incorretos",
        statusCode: 401,
      });
    }

    const user = new User(userData);

    if (!process.env.PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY não configurada");
    }

    const token = jwt.sign(user.dadosPublicos(), process.env.PRIVATE_KEY);

    return { token, usuario: user.dadosPublicos() };
  }
}
