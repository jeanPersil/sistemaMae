import jwt from "jsonwebtoken";
import "dotenv/config";

export function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/");
  }
  console.log("Token que chegou aqui: ")
  console.log(token);

  try {
    const payload = jwt.verify(token, process.env.PRIVATE_KEY);

    if (typeof payload === "string" || !payload.id) {
      return res.status(401).json({
        message: "Token inválido",
      });
    }

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado",
    });
  }
}
