import * as Yup from 'yup';

export const signupValidation = Yup.object().shape({
	userName: Yup.string()
		.trim()
		.matches(/^\S*$/, 'Username cannot contain space')
		.required('Username is required')
		.min(2, 'Username must be at least 2 characters')
		.max(20, 'Username must not exceed 20 characters'),
	email: Yup.string()
		.required('Email is required')
		.email('Email is invalid')
		.trim(),
	password: Yup.string()
		.required('Password is required')
		.trim()
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
});

export const signinValidation = Yup.object().shape({
	email: Yup.string().required('Email is required').email('Email is invalid'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
});

export const userInfoValidation = Yup.object().shape({
	userName: Yup.string()
		.trim()
		.matches(/^\S*$/, 'Username cannot contain space')
		.required('Username is required')
		.min(2, 'Username must be at least 2 characters')
		.max(20, 'Username must not exceed 20 characters'),
	email: Yup.string()
		.required('Email is required')
		.email('Email is invalid')
		.trim(),
});
export const createUserValidator = Yup.object().shape({
	userName: Yup.string()
		.trim()
		.matches(/^\S*$/, 'Username cannot contain space')
		.required('Username is required')
		.min(2, 'Username must be at least 2 characters')
		.max(20, 'Username must not exceed 20 characters'),
	email: Yup.string()
		.required('Email is required')
		.email('Email is invalid')
		.trim(),
	password: Yup.string()
		.required('Password is required')
		.trim()
		.min(6, 'Password must be at least 6 characters')
		.max(40, 'Password must not exceed 40 characters'),
	role: Yup.string()
		.required('Role is required')
		.oneOf(['admin', 'user', 'moderator']),
});
export const resetPasswordValidator = Yup.object().shape({
	newPassword: Yup.string()
		.required('New password is required')
		.trim()
		.min(6, 'New password must be at least 6 characters')
		.max(40, 'New password must not exceed 40 characters'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword')], 'Passwords must match')
		.required('Confirm password is required'),
});
