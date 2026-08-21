export function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  if (statusCode == 500) {
    console.error(error.message);
    return res.status(statusCode).json({
      message: "Erro interno do servidor",
    });
  }

  return res.status(statusCode).json({
    message: error.message || "Erro interno do servidor",
  });
}
