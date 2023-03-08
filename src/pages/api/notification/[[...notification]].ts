import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import { authorized, restictUser } from 'src/backend/controller/usercontroller';
import { notificationReadStatus } from '@/backend/controller/notificationcontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.put(
		'/api/notification/read/:id',
		authorized,
		restictUser('user', 'admin', 'moderator'),
		notificationReadStatus,
	);

export default router.handler({
	onError,
	onNoMatch,
});
