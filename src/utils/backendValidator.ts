import Joi from 'joi';
export const userValidate = Joi.object({
	userName: Joi.string().required().min(2).max(30).messages({
		'string.empty': `User name is a required`,
		'any.required': `User name is a required`,
		'string.min': `User name should have a minimum 2 charecter`,
	}),
	email: Joi.string().email().lowercase().trim().required().messages({
		'string.empty': `Email is a required`,
		'any.required': `Email is a required`,
	}),
	password: Joi.string().required().min(6).max(250).messages({
		'string.min': `Password should have a minimum 6 charecter`,
		'any.required': `Password is a required`,
	}),
});
export const userUpdateValidate = Joi.object({
	name: Joi.string().required().min(2).max(30).messages({
		'string.empty': `name is a required`,
		'any.required': `name is a required`,
		'string.min': `name should have a minimum 2 charecter`,
	}),
	email: Joi.string().email().lowercase().trim().required().messages({
		'string.empty': `email is a required`,
		'any.required': `email is a required`,
	}),
});
