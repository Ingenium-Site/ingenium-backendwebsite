export const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({
        error: error.details?.map((d) => d.message).join(", ") || error.message
      });
    }
  };
};