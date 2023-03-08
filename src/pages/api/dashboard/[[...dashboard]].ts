import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import { authorized, restictUser } from 'src/backend/controller/usercontroller';
import {
	AdminDashboard,
	AdminUsersList,
	Replies,
	Threads,
	Users,
} from '@/backend/controller/dashboardcontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get(
		'/api/dashboard/info',
		authorized,
		restictUser('admin', 'moderator'),
		AdminDashboard,
	)
	.get(
		'/api/dashboard/replies',
		authorized,
		restictUser('admin', 'moderator'),
		Replies,
	)
	.get(
		'/api/dashboard/threads',
		authorized,
		restictUser('admin', 'moderator'),
		Threads,
	)
	.get(
		'/api/dashboard/users',
		authorized,
		restictUser('admin', 'moderator'),
		Users,
	)
	.get('/api/dashboard/adminlist', AdminUsersList);

export default router.handler({
	onError,
	onNoMatch,
});
