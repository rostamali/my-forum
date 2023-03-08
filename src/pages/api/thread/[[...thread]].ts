import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import { authorized, restictUser } from 'src/backend/controller/usercontroller';
import {
	adminDeleteThread,
	createComment,
	createThread,
	deleteThread,
	downVoteThread,
	getSingleThread,
	getSingleThreadById,
	homeContent,
	loveVoteThread,
	searchThread,
	unreadThread,
	upVoteThread,
	updateThread,
} from '@/backend/controller/threadcontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/thread/home-content', homeContent)

	.get('/api/thread/unread', authorized, unreadThread)
	.put('/api/thread/upvote', authorized, upVoteThread)
	.put('/api/thread/downvote', authorized, downVoteThread)
	.put('/api/thread/lovevote', authorized, loveVoteThread)
	.post(
		'/api/thread/create',
		authorized,
		restictUser('admin', 'moderator', 'user'),
		createThread,
	)
	.post(
		'/api/thread/comment/create',
		authorized,
		restictUser('admin', 'user', 'moderator'),
		createComment,
	)
	.put(
		'/api/thread/update/:id',
		authorized,
		restictUser('user', 'admin', 'moderator'),
		updateThread,
	)
	.get('/api/thread/single/:slug', authorized, getSingleThread)
	.get('/api/thread/singleById/:id', authorized, getSingleThreadById)
	.get('/api/thread/search/:text', searchThread)
	.delete(
		'/api/thread/delete/:id',
		authorized,
		restictUser('admin', 'user', 'moderator'),
		deleteThread,
	)
	.delete(
		'/api/thread/admindelete/:id',
		authorized,
		restictUser('admin', 'moderator'),
		adminDeleteThread,
	);

export default router.handler({
	onError,
	onNoMatch,
});
