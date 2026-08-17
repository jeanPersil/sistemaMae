import Joi from "joi";

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errosFormatados = error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        erro: "Dados de entrada inválidos",
        details: errosFormatados,
      });
    }

    req.body = value;

    next();
  };
};
