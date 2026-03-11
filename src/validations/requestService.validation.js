import Joi from "joi";

export const requestServiceValidationSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  serviceType: Joi.string().max(100).required()
});
