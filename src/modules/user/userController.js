import { AppError } from "../../erro.js";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export class UserController {
  constructor(UserService) {
    this.userServ = UserService;
  }

  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError({
        message: "Email e senha são obrigatorios",
        statusCode: 400,
      });
    }

    if (!isValidEmail(email)) {
      throw new AppError({ message: "Email invalido", statusCode: 400 });
    }

    const { token, usuario } = await this.userServ.login({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json(usuario);
  };

  logout = async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200);
  };
}
