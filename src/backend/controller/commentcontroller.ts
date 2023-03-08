import { NextApiRequestExtended } from '@/types';
import CatchAsync from '@/utils/catchAsync';
import { NextApiResponse } from 'next';
import { Comment, Thread } from '../model';

export const deleteCommentByUser = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.params;
		const exist = await Comment.findOne({
			_id: id,
			user: req.user._id,
		}).select('_id user');
		if (!exist) throw new Error('Comment not found');
		const thread = await Thread.findOneAndUpdate(
			{ comment: exist._id },
			{
				$pull: {
					comments: exist._id,
				},
			},
		);
		const deleteComment = await Comment.findOneAndDelete({
			_id: id,
			user: req.user._id,
		});
		if (!deleteComment) throw new Error('Oops! Try again');
		res.status(200).json({
			status: 'success',
			message: 'Comment deleted successfully',
		});
	},
);
export const upVoteComment = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.body;
		const existComment = await Comment.findById(id).select(
			'upVote downVote _id',
		);
		const upVoteExist = existComment.upVote.includes(req.user._id);
		const downVoteExist = existComment.downVote.includes(req.user._id);
		if (upVoteExist) throw new Error('Like already done!');
		const upThread = await Comment.findByIdAndUpdate(id, {
			$push: { upVote: req.user._id },
			$pull: { downVote: req.user._id },
		});
		res.status(200).json({
			status: 'success',
		});
	},
);
export const downVoteComment = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.body;
		const existComment = await Comment.findById(id).select(
			'upVote downVote _id',
		);
		const upVoteExist = existComment.upVote.includes(req.user._id);
		const downVoteExist = existComment.downVote.includes(req.user._id);
		if (downVoteExist) throw new Error('Dislike already done!');
		const downComment = await Comment.findByIdAndUpdate(id, {
			$pull: { upVote: req.user._id },
			$push: { downVote: req.user._id },
		});
		res.status(200).json({
			status: 'success',
		});
	},
);
export const loveVoteComment = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.body;
		const comment = await Comment.findById(id);
		const loveVoteExist = comment.loveVote.includes(req.user._id);
		if (loveVoteExist) throw new Error('Love react already done!');
		const loveThread = await Comment.findByIdAndUpdate(id, {
			$push: { loveVote: req.user._id },
		});
		res.status(200).json({
			status: 'success',
		});
	},
);
export const deleteCommentByAdmin = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.params;
		const exist = await Comment.findOne({
			_id: id,
		}).select('_id user');
		if (!exist) throw new Error('Comment not found');
		const thread = await Thread.findOneAndUpdate(
			{ comment: exist._id },
			{
				$pull: {
					comments: exist._id,
				},
			},
		);
		const deleteComment = await Comment.findOneAndDelete({
			_id: id,
		});
		if (!deleteComment) throw new Error('Oops! Try again');
		res.status(200).json({
			status: 'success',
			message: 'Comment deleted successfully',
		});
	},
);
