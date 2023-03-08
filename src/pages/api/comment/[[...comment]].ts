import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import { authorized, restictUser } from 'src/backend/controller/usercontroller';
import {
	deleteCommentByAdmin,
	deleteCommentByUser,
	downVoteComment,
	loveVoteComment,
	upVoteComment,
} from '@/backend/controller/commentcontroller';

const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.put('/api/comment/upvote', authorized, upVoteComment)
	.put('/api/comment/downvote', authorized, downVoteComment)
	.put('/api/comment/lovevote', authorized, loveVoteComment)
	.delete(
		'/api/comment/deleteByAdmin/:id',
		authorized,
		restictUser('admin', 'moderator'),
		deleteCommentByAdmin,
	)
	.delete(
		'/api/comment/deleteByUser/:id',
		authorized,
		restictUser('user'),
		deleteCommentByUser,
	);

export default router.handler({
	onError,
	onNoMatch,
});
