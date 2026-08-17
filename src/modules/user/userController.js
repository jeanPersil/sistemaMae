import { UserService } from "./userService.js";

const userServ = new UserService();

// Validar formato de email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  return password && password.length >= 6;
};

export class UserController {
  signUp = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      // Validar dados de entrada
      if (!name || !email || !password || !role) {
        return res.status(400).json({
          error: "Nome, email, senha e role são obrigatórios",
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Email inválido" });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({
          error: "Senha deve ter no mínimo 6 caracteres",
        });
      }

      const data = await userServ.SignUp({ email, name, password, role });

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: data,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message || "Erro ao criar usuário",
      });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email e senha são obrigatórios",
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Email inválido" });
      }

      const { token, usuario } = await userServ.login({ email, password });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(200).json({
        message: "Login realizado com sucesso",
        user: usuario,
      });
    } catch (error) {
      return res.status(401).json({
        error: error.message || "Erro ao fazer login",
      });
    }
  };

  logout = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(200).json({
        message: "Logout realizado com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao fazer logout",
      });
    }
  };
}
