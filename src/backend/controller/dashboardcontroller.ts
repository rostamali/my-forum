import { NextApiRequestExtended } from '@/types';
import CatchAsync from '@/utils/catchAsync';
import { NextApiResponse } from 'next';
import { Category, Comment, Thread, User } from '../model';

export const Replies = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { select, limit = 9, page = 1 } = req.query;
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
		const comment = await Comment.find({})
			.populate({
				path: 'user',
				select: 'userName',
			})
			.populate({
				path: 'thread',
				select: 'title category',
				populate: {
					path: 'category',
					select: 'title background',
				},
			})
			.select('-__v -loveVote -downVote -upVote -dateCreated')
			.skip(skip)
			.limit(parseInt(limit as string, 10));
		const totalData = await Comment.countDocuments({});
		res.status(200).json({
			status: 'success',
			data: comment,
			pages: Math.ceil(totalData / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string),
		});
	},
);
export const Threads = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { select, limit = 9, page = 1 } = req.query;
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
		const thread = await Thread.find({})
			.select('title category upVote comments lastActivity author status')
			.populate({
				path: 'author category',
				select: 'userName title background',
			})
			.skip(skip)
			.limit(parseInt(limit as string, 10));
		const totalData = await Thread.countDocuments({});
		res.status(200).json({
			status: 'success',
			data: thread,
			pages: Math.ceil(totalData / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string),
		});
	},
);
export const Users = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		//
		const users = await User.find({
			role: 'user',
			active: { $ne: false },
		}).select('userName createdAt role isVerified lastActivity');
		const admins = await User.find({
			role: 'admin',
			active: { $ne: false },
		}).select('userName createdAt role isVerified lastActivity');
		const moderator = await User.find({
			role: 'moderator',
			active: { $ne: false },
		}).select('userName createdAt role isVerified lastActivity');
		const deleted = await User.find({
			active: false,
		}).select('userName createdAt role isVerified lastActivity');
		res.status(200).json({
			status: 'success',
			data: {
				users,
				admins,
				moderator,
				deleted,
			},
		});
	},
);
export const AdminUsersList = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const admins = await User.find({
			role: 'admin',
		}).select('userName');
		const moderator = await User.find({
			role: 'moderator',
		}).select('userName');
		res.status(200).json({
			status: 'success',
			admins,
			moderator,
		});
	},
);
export const AdminDashboard = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const totalThreads = await Thread.countDocuments({});
		const totalReplies = await Comment.countDocuments({});
		const totalUser = await User.countDocuments({});
		const totalCategory = await Category.countDocuments({});
		const mostView = await Thread.find({
			viewsLength: { $gt: 10 },
		})
			.select('title slug topic tags views comments author category')
			.populate({
				path: 'author category',
				select: 'userName title background',
			})
			.limit(3);
		res.status(200).json({
			status: 'success',
			threads: totalThreads,
			replies: totalReplies,
			user: totalUser,
			category: totalCategory,
			mostView,
		});
	},
);
