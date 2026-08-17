import jwt from "jsonwebtoken";
import { UserRepository } from "../../banco/repository/userRepository.js";
import bcrypt from "bcrypt";
import { User } from "./entity/userEntity.js";

const userRepo = new UserRepository();

export class UserService {
  async SignUp({ name, email, password, role }) {
    const saltRounds = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const userData = await userRepo.SignUp({
      email,
      name,
      password: encryptedPassword,
      role,
    });
    const user = new User(userData);
    return user.dadosPublicos();
  }

  async login({ email, password }) {
    const userData = await userRepo.login(email);

    // Verificar se usuário existe
    if (!userData) {
      throw new Error("Email ou senha incorreto");
    }

    const match = await bcrypt.compare(password, userData.senha);

    if (!match) {
      throw new Error("Email ou senha incorreto");
    }

    const user = new User(userData);

    // Validar PRIVATE_KEY
    if (!process.env.PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY não configurada");
    }

    const token = jwt.sign(user.dadosPublicos(), process.env.PRIVATE_KEY);

    return { token, usuario: user.dadosPublicos() };
  }
}
