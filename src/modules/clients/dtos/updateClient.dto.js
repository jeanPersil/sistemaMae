import Joi from "joi";

/**
 * @typedef {Object} UpdateClienteDTO
 * @property {string} [name] - obrigatorio (max 150 caracteres)
 * @property {string} [phone] - Opcional (max 20 caracteres)
 * @property {string} [email] - Opcional
 * @property {string} [neighborhood] - Opcional (max 100 caracteres)
 * @property {number} [fk_city] - Opcional
 * @property {string} [howDidYouHear] - Opcional (max 100 caracteres)
 * @property {Date|string} [birthday] - Opcional
 * @property {string} [notes] - Opcional
 */

export const updateClienteSchema = Joi.object({
  name: Joi.string().min(1).max(150).optional().messages({
    "string.empty": "O nome não pode ser vazio",
    "string.max": "O nome deve ter no máximo 150 caracteres",
  }),

  phone: Joi.string()
    .max(20)
    .allow(null, "")
    .required()
    .messages({ "string.max": "O telefone deve ter no máximo 20 caracteres" }),

  email: Joi.string().email().max(255).allow(null, "").optional().messages({
    "string.email": "Formato de e-mail inválido",
    "string.max": "O e-mail deve ter no máximo 255 caracteres",
  }),

  neighborhood: Joi.string().max(100).allow(null, "").optional(),

  fk_city: Joi.number().integer().positive().allow(null).optional().messages({
    "number.base": "O ID da cidade deve ser um número",
    "number.positive": "O ID da cidade deve ser positivo",
  }),

  howDidYouHear: Joi.string().max(100).allow(null, "").optional(),

  birthday: Joi.date()
    .iso()
    .allow(null, "")
    .optional()
    .messages({ "date.format": "Data de aniversário inválida" }),

  notes: Joi.string().allow(null, "").optional(),
})
  .min(1)
  .messages({
    "object.min": "Pelo menos um campo deve ser enviado para atualização",
  });
