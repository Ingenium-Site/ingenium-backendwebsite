import Joi from "joi";

export const contactValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  company: Joi.string().max(100).allow("").optional(),
  message: Joi.string().min(10).max(1000).required()
});
