import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import { authorized, restictUser } from 'src/backend/controller/usercontroller';
import {
	createCategory,
	getCategorys,
	getSingleCategorys,
	updateCategory,
} from '@/backend/controller/categorycontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/category/all', getCategorys)
	.get('/api/category/single/:slug', getSingleCategorys)
	.post(
		'/api/category/create',
		authorized,
		restictUser('admin', 'moderator'),
		createCategory,
	)
	.put(
		'/api/category/update/:id',
		authorized,
		restictUser('admin', 'moderator'),
		updateCategory,
	);

export default router.handler({
	onError,
	onNoMatch,
});
