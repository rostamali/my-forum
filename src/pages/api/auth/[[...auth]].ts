import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '@/backend/dbConnect';
import { NextApiRequestExtended } from '@/types';
import {
	adminDeleteUser,
	authorized,
	createUser,
	deleteUser,
	forgetPassword,
	getProfile,
	logoutUser,
	restPassword,
	restictUser,
	signinUser,
	signupUser,
	updateAdmin,
	updateUser,
	userDashboard,
	userList,
} from '@/backend/controller/usercontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/auth/profile', authorized, getProfile)
	.get('/api/auth/dashboard', authorized, userDashboard)
	.get('/api/auth/users', authorized, restictUser('admin'), userList)
	.get('/api/auth/info', authorized, getProfile)
	.post(
		'/api/auth/createuser',
		authorized,
		restictUser('admin', 'moderator'),
		createUser,
	)
	.post('/api/auth/logout', authorized, logoutUser)
	.post('/api/auth/signup', signupUser)
	.post('/api/auth/signin', signinUser)
	.post('/api/auth/forget', forgetPassword)
	.post('/api/auth/reset', restPassword)
	.put(
		'/api/auth/update/admin',
		authorized,
		restictUser('admin'),
		updateAdmin,
	)
	.put(
		'/api/auth/update/user',
		authorized,
		restictUser('user', 'moderator', 'admin'),
		updateUser,
	)
	.delete(
		'/api/auth/user/delete',
		authorized,
		restictUser('user', 'moderator', 'admin'),
		deleteUser,
	)
	.delete(
		'/api/auth/deleteuser/:id',
		authorized,
		restictUser('admin', 'moderator'),
		adminDeleteUser,
	);

export default router.handler({
	onError,
	onNoMatch,
});
