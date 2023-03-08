import { NextApiRequestExtended } from '@/types';
import CatchAsync from '@/utils/catchAsync';
import { NextApiResponse } from 'next';
import slugify from 'slugify';
import { Category, Comment, Notification, Thread, User } from '../model';

export const createThread = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { title, topic, description, tags, category } = req.body;
		if (!title) throw new Error('Title name missing');
		const slug = slugify(title, {
			replacement: '-',
			lower: true,
			trim: true,
		});
		const data = await Thread.create({
			title,
			slug,
			topic,
			description,
			tags,
			author: req.user._id,
			category,
		});
		if (!data) throw new Error('Could not create thread');
		const updateCategory = await Category.findById(category);
		updateCategory.threads.push(data._id);
		await updateCategory.save();

		if (!data) throw new Error('Invalid data');
		res.status(200).json({
			status: 'success',
			message: 'Thread created successfully',
		});
	},
);
export const getSingleThread = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const thread = await Thread.findOne({
			slug: req.params.slug,
			status: { $ne: false },
		})
			.populate({
				path: 'author comments',
			})
			.populate({
				path: 'comments',
				select: 'user text dateCreated upVote downVote loveVote',
				populate: {
					path: 'user',
					select: 'userName',
				},
			});
		thread.views.push(req.user._id);
		await thread.save();
		const upVoteExist = thread.upVote.includes(req.user._id);
		const downVoteExist = thread.downVote.includes(req.user._id);
		const loveVoteExist = thread.loveVote.includes(req.user._id);
		res.status(200).json({
			status: 'success',
			data: thread,
			upVote: upVoteExist,
			downVote: downVoteExist,
			loveVote: loveVoteExist,
			views: thread ? thread.views.length : 0,
			subscriber: thread.subscriber.length,
		});
	},
);
export const upVoteThread = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.body;
		const thread = await Thread.findById(id);
		const upVoteExist = thread.upVote.includes(req.user._id);
		const downVoteExist = thread.downVote.includes(req.user._id);
		if (upVoteExist) throw new Error('Like already done!');
		const upThread = await Thread.findByIdAndUpdate(id, {
			$push: { upVote: req.user._id },
			$pull: { downVote: req.user._id },
		});
		const notification = thread.subscriber.map((user: string) => ({
			user: user,
			text: `${req.user.userName} like ${thread.title} thread`,
			link: `/thread/${thread.slug}`,
			thread: thread._id,
			read: false,
		}));
		await Notification.insertMany(notification);
		res.status(200).json({
			status: 'success',
		});
	},
);
export const downVoteThread = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.body;
		const thread = await Thread.findById(id);
		const upVoteExist = thread.upVote.includes(req.user._id);
		const downVoteExist = thread.downVote.includes(req.user._id);
		if (downVoteExist) throw new Error('Dislike already done!');
		const downThread = await Thread.findByIdAndUpdate(id, {
			$pull: { upVote: req.user._id },
			$push: { downVote: req.user._id },
		});
		const notification = thread.subscriber.map((user: string) => ({
			user: user,
			text: `${req.user.userName} dislike ${thread.title} thread`,
			link: `/thread/${thread.slug}`,
			thread: thread._id,
			read: false,
		}));
		await Notification.insertMany(notification);
		res.status(200).json({
			status: 'success',
		});
	},
);
export const loveVoteThread = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.body;
		const thread = await Thread.findById(id);
		const loveVoteExist = thread.loveVote.includes(req.user._id);
		if (loveVoteExist) throw new Error('Love react already done!');
		const loveThread = await Thread.findByIdAndUpdate(id, {
			$push: { loveVote: req.user._id },
		});
		const notification = thread.subscriber.map((user: string) => ({
			user: user,
			text: `${req.user.userName} love ${thread.title} thread`,
			link: `/thread/${thread.slug}`,
			thread: thread._id,
			read: false,
		}));
		await Notification.insertMany(notification);
		res.status(200).json({
			status: 'success',
		});
	},
);
export const createComment = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const comment = await Comment.create({
			text: req.body.description,
			user: req.user._id,
			thread: req.body.threadId,
		});
		if (!comment) throw new Error('Oops! Try again');
		const selectedThread = await Thread.findById(req.body.threadId);
		const notification = selectedThread.subscriber.map((user: string) => ({
			user: user,
			text: `${req.user.userName} comment on ${selectedThread.title} thread`,
			link: `/thread/${selectedThread.slug}`,
			thread: selectedThread._id,
			read: false,
		}));
		await Notification.insertMany(notification);
		if (req.body.subscribe) {
			const thread = await Thread.findByIdAndUpdate(req.body.threadId, {
				$push: {
					comments: comment._id,
					subscriber: req.user._id,
				},
			});
			res.status(200).json({
				status: 'success',
				message: 'Comment is created',
			});
		} else {
			const thread = await Thread.findByIdAndUpdate(req.body.threadId, {
				$push: {
					comments: comment._id,
				},
			});
			res.status(200).json({
				status: 'success',
				message: 'Comment is created',
			});
		}
	},
);
export const homeContent = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const threads = await Thread.find({})
			.select('title slug topic tags views comments author category')
			.populate({
				path: 'author category',
				select: 'userName title background',
			})
			.limit(3);
		const categories = await Category.find({})
			.select('description title background threads tags createdAt slug')
			.limit(3)
			.sort({
				createdAt: -1,
			});
		res.status(200).json({
			status: 'success',
			threads,
			categories,
		});
	},
);
export const unreadThread = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const threads = await Thread.find({
			views: { $ne: '63eddade889fa16a8f93b7a3' },
		})
			.select(
				'title slug topic tags views comments author category upVote',
			)
			.populate({
				path: 'author category',
				select: 'userName title background',
			})
			.limit(3);
		res.status(200).json({
			status: 'success',
			threads,
		});
	},
);
export const deleteThread = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const thread = await Thread.findOneAndUpdate(
			{
				_id: req.params.id,
				author: req.user._id,
				status: { $ne: false },
			},
			{
				status: false,
			},
		);
		if (!thread) throw new Error(`Couldn't find the thread`);
		res.status(200).json({
			status: 'success',
			message: 'Successfully deleted thread',
		});
	},
);
export const adminDeleteThread = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const thread = await Thread.findOneAndUpdate(
			{
				_id: req.params.id,
				status: { $ne: false },
			},
			{
				status: false,
			},
		);
		if (!thread) throw new Error(`Couldn't find the thread`);
		res.status(200).json({
			status: 'success',
			message: 'Successfully deleted thread',
		});
	},
);
export const getSingleThreadById = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const thread = await Thread.findOne({
			_id: req.params.id,
			status: { $ne: false },
			author: req.user._id,
		}).select('title topic description category author tags author');
		const categorys = await Category.find({}).select('title _id');
		res.status(200).json({
			status: 'success',
			thread,
			categorys,
		});
	},
);
export const updateThread = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.params;
		const { title, topic, category, description, tags } = req.body;
		// 1. Post exist or not
		const exist = await Thread.findById(id);
		if (!exist) throw new Error('Thread not found');

		// 2. Pull category
		await Category.findOneAndUpdate(exist.category, {
			$pull: {
				threads: exist._id,
			},
		});
		// 3. Put updated info
		const slug = slugify(title, {
			replacement: '-',
			lower: true,
			trim: true,
		});
		// 4. Update category
		const updatedThread = await Thread.findOneAndUpdate(
			{
				_id: id,
			},
			{ title, slug, topic, description, category, tags },
			{ runValidators: true },
		);
		const updateCategory = await Category.findById(category);
		updateCategory.threads.push(updatedThread._id);
		await updateCategory.save();
		if (!updatedThread) throw new Error('Oops! Please try again');
		res.status(200).json({
			status: 'success',
			message: 'Successfully updated',
		});
	},
);
export const searchThread = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { text } = req.params;
		const threads = await Thread.find({
			title: { $regex: new RegExp(text, 'i') },
		})
			.select(
				'title slug topic tags views comments author category upVote',
			)
			.populate({
				path: 'author category',
				select: 'userName title background',
			});
		res.status(200).json({
			status: 'success',
			threads,
		});
	},
);
