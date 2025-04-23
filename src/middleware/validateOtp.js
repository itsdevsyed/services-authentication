import Joi from 'joi';

const schemas = {
  resend: Joi.object({ email: Joi.string().email().required() }),
  verify: Joi.object({ email: Joi.string().email().required(), otp: Joi.string().length(6).pattern(/^[0-9]+$/).required() }),
};

export default (mode) => (req, res, next) => {
  const schema = schemas[mode];
  const { error } = schema.validate(req.body);
  if (error) throw new AppError(error.details[0].message, 400);
  next();
};
