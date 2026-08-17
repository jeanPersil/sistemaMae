import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Acesso negado. Token não fornecido.",
    });
  }

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
