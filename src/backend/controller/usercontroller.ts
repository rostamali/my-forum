import { NextApiResponse, NextApiRequest } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { userValidate } from 'src/utils/backendValidator';
import CatchAsync from 'src/utils/catchAsync';
import { Comment, Notification, Thread, User } from '../model';
import { JwtPayload, NextApiRequestExtended } from '../../types';
import { forgetPasswordTemplate } from '../email/emailTemplate';
import sendEmail from '../email/emailHandler';

const createSendToken = (
	user: any,
	statusCode: number,
	res: NextApiResponse,
	message: string,
) => {
	const token = jwt.sign(
		{
			id: user._id,
			role: user.role,
			name: user.userName,
			email: user.email,
		},
		process.env.JWT_SIGNUP_PASSWORD_SECRET,
		{
			expiresIn: process.env.JWT_SIGNUP_TOKEN_EXPIRES_IN,
		},
	);
	res.setHeader(
		'Set-Cookie',
		serialize('myForum', token, {
			sameSite: 'strict',
			path: '/',
			expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
		}),
	);
	res.status(statusCode).json({
		status: 'success',
		message,
		role: user.role,
	});
};
export const signupUser = CatchAsync(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { userName, email, password } = req.body;
		if (!userName || !email || !password) throw new Error('Invalid Info');
		const { error } = userValidate.validate({
			userName,
			email,
			password,
		});
		if (error) {
			throw new Error(error as any);
		}
		const exist = await User.findOne({ email });
		if (exist) {
			throw new Error('User Already Exist');
		}
		const userNameExist = await User.findOne({ userName: userName });
		if (userNameExist) {
			throw new Error('User name Already Exist');
		}
		const bcryptpass = await bcrypt.hash(password, 12);
		const newUser = await User.create({
			userName: userName.replace(/  +/g, ' '),
			email,
			password: bcryptpass,
		});
		if (!newUser) throw new Error(newUser);
		createSendToken(newUser, 200, res, 'Account registered successfully');
	},
);
export const signinUser = CatchAsync(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { email, password } = req.body;
		if (!email || !password)
			return res.status(400).json({
				status: 'fail',
				message: 'Invalid Data',
			});
		const user = await User.findOne({
			email,
			active: { $ne: false },
		}).select('userName _id email thumbnail role password active');
		if (!user) throw new Error('Account not found');

		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new Error('Email or password is incorrect');
		}
		createSendToken(user, 200, res, 'Successfully Login');
	},
);
export const getProfile = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const notification = await Notification.find({
			user: req.user._id,
			read: false,
		})
			.populate({
				path: 'user',
				select: 'userName',
			})
			.select('text link user read');
		res.status(200).json({
			status: 'success',
			data: req.user,
			notification: notification,
		});
	},
);
export const authorized = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		if (!req.headers.cookie || !req.headers.cookie.startsWith('myForum'))
			throw new Error('Please login.');
		const token = req.headers.cookie.split('=')[1];
		const decoded = jwt.verify(
			token,
			'this-is-our-super-authentication-methode-with-jwt-token',
		) as JwtPayload;
		if (!decoded) throw new Error('Please try again');
		const dateNow = Date.now();
		if (decoded.exp === dateNow / 1000 || decoded.exp < dateNow / 1000) {
			throw new Error(
				'Authentication token expired. Please login again.',
			);
		}
		const user = await User.findById(decoded.id).select(
			'email slug active role thumbnail userName firstName lastName',
		);
		if (!user.active) throw new Error('Account not active');
		if (!user) {
			res.setHeader(
				'Set-Cookie',
				serialize('myForum', '', {
					maxAge: -1,
					path: '/',
				}),
			);
			throw new Error('User not found');
		}
		req.user = user;
		next();
	},
);
export const logoutUser = async (
	req: NextApiRequestExtended,
	res: NextApiResponse,
) => {
	if (!req.user.email) throw new Error('Already logged out');
	res.setHeader(
		'Set-Cookie',
		serialize('myForum', '', {
			maxAge: -1,
			path: '/',
		}),
	);
	res.status(200).json({
		status: 'success',
		message: 'Successfully Logout',
	});
};
export const restictUser = (...roles: string[]) => {
	return (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		if (!roles.includes(req.user.role)) {
			throw new Error('You dont have permission');
		}
		next();
	};
};
export const updateAdmin = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { firstName, lastName, role, active, thumbnail } = req.body;
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				firstName,
				lastName,
				role,
				active,
				thumbnail,
			},
			{
				runValidators: true,
				new: true,
			},
		);
		if (!user) throw new Error('Oops! Please try again');
		createSendToken(user, 200, res, 'Updated successfully');
	},
);
export const userList = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { limit = 9, page = 1 } = req.query;
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
		const users = await User.find()
			.select('userName email thumbnail role active')
			.skip(skip)
			.limit(parseInt(limit as string, 10));
		const totalPost = await User.countDocuments({});
		res.status(200).json({
			status: 'success',
			pages: Math.ceil(totalPost / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string),
			data: users,
		});
	},
);
export const deleteUser = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		await User.findByIdAndUpdate(req.user._id, {
			active: false,
		});
		res.setHeader(
			'Set-Cookie',
			serialize('myForum', '', {
				maxAge: -1,
				path: '/',
			}),
		);
		res.status(200).json({
			status: 'success',
			message: 'Account deleted successfully',
		});
	},
);
export const adminDeleteUser = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { id } = req.params;
		if (req.user._id === id)
			throw new Error('Current account is not deletable');
		const deleteUser = await User.findById(id).select('active');
		if (!deleteUser) throw new Error('Invalid User');
		if (!deleteUser.active) throw new Error('Account already deleted');
		deleteUser.active = false;
		await deleteUser.save();
		res.status(200).json({
			status: 'success',
			message: 'Account deleted successfully',
		});
	},
);
export const updateUser = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { userName, email, location, website, about } = req.body;
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				userName,
				email,
				location,
				website,
				about,
			},
			{ runValidators: true },
		);
		createSendToken(user, 200, res, 'Updated successfully');
	},
);
export const createUser = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { userName, email, password, role } = req.body;
		if (!userName || !email || !password || !role)
			throw new Error('Invalid Info');
		const { error } = userValidate.validate({
			userName: userName,
			email,
			password,
		});
		if (error) {
			const message = error.details.map((item) => item.message);
			throw new Error(message.length > 0 ? message[0] : 'Invalid info');
		}
		const exist = await User.findOne({ email });
		if (exist) {
			throw new Error('User Already Exist');
		}
		const userNameExist = await User.findOne({ userName });
		if (userNameExist) {
			throw new Error('User name Already Exist');
		}
		const bcryptpass = await bcrypt.hash(password, 12);
		const newUser = await User.create({
			userName: userName.replace(/  +/g, ' '),
			email,
			password: bcryptpass,
			role,
		});
		res.status(200).json({
			status: 'success',
			message: 'User created successfully',
		});
	},
);
export const userDashboard = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const replies = await Comment.find({
			user: req.user._id,
		})
			.select('user text thread dateCreated upVote')
			.populate({
				path: 'user thread',
				select: 'userName title slug',
			})
			.exec();
		const threads = await Thread.find({
			author: req.user._id,
			status: { $ne: false },
		})
			.select(
				'title slug topic tags views comments author category upVote',
			)
			.populate({
				path: 'author category',
				select: 'userName title background',
			});
		const user = await User.findById(req.user._id).select(
			'userName email location website about',
		);
		res.status(200).json({
			status: 'success',
			replies,
			threads,
			user,
		});
	},
);
export const forgetPassword = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { email } = req.body;
		if (!email) throw new Error('Invalid email');
		const existUser = await User.findOne({ email });
		if (!existUser) throw new Error('User not found');

		const resetToken = jwt.sign(
			{ id: existUser._id, email: existUser.email },
			process.env.JWT_RESET_PASSWORD_SECRET,
			{
				expiresIn: process.env.JWT_RESET_TOKEN_EXPIRES_IN,
			},
		);
		const resetURL = `${process.env.BASE_URL}/reset-password/${resetToken}`;

		try {
			const template = forgetPasswordTemplate(resetURL);
			await sendEmail({
				subject: 'My Forum Forget Password',
				template,
				to: existUser.email,
			});
			res.status(201).json({
				status: 'success',
				message: 'Password reset link sent',
			});
		} catch (err) {
			throw new Error('Email sending failed. Try again later');
		}
	},
);
export const restPassword = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { newPassword, confirmPassword, token } = req.body;

		const decoded = jwt.verify(
			token,
			process.env.JWT_RESET_PASSWORD_SECRET,
		) as JwtPayload;
		if (!decoded) throw new Error('Please try again');
		const user = await User.findById(decoded.id);
		if (!user) throw new Error('User not found');
		const bcryptpass = await bcrypt.hash(newPassword, 12);

		user.password = bcryptpass;
		await user.save();
		res.status(200).json({
			status: 'success',
			message: 'Password reset. Please login now.',
		});
	},
);
