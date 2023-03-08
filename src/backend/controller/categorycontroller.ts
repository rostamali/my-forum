import { NextApiRequestExtended } from '@/types';
import CatchAsync from '@/utils/catchAsync';
import { NextApiResponse } from 'next';
import slugify from 'slugify';
import { Category } from '../model';

export const createCategory = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { title, description, tags, background } = req.body;
		if (!title) throw new Error('Category name missing');
		const slug = slugify(title, {
			replacement: '-',
			lower: true,
			trim: true,
		});
		const data = await Category.create({
			title,
			slug,
			description,
			tags,
			background,
		});
		if (!data) throw new Error('Invalid data');
		res.status(200).json({
			status: 'success',
			message: 'Category created successfully',
		});
	},
);
export const getCategorys = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { select, limit = 9, page = 1 } = req.query;
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
		const selectedData = select
			? (select as string).split(',').join(' ')
			: '-__v';
		const categorys = await Category.find({})
			.select(selectedData)
			.skip(skip)
			.limit(parseInt(limit as string, 10));

		const totalData = await Category.countDocuments({});
		res.status(200).json({
			status: 'success',
			pages: Math.ceil(totalData / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string),
			data: categorys,
		});
	},
);
export const updateCategory = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.params;
		const { title, description, tags } = req.body;
		if (!title || !description || !tags) throw new Error('Invalid data');
		const slug = slugify(title, {
			replacement: '-',
			lower: true,
			trim: true,
		});
		const notupdateable = await Category.findById(id);
		if (notupdateable.title === 'uncategorized')
			throw new Error('Uncategorized is not updateable !');
		const category = await Category.findByIdAndUpdate(
			id,
			{
				title,
				description,
				slug,
				tags,
			},
			{
				new: true,
				runValidators: true,
			},
		);
		if (!category) throw new Error('Oops, try again');
		res.status(200).json({
			status: 'success',
			message: 'Category updated successfully',
		});
	},
);
export const getSingleCategorys = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { select, limit = 9, page = 1 } = req.query;
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
		const selectedData = select
			? (select as string).split(',').join(' ')
			: '-__v';
		const categorys = await Category.findOne({
			slug: req.params.slug,
		})
			.populate({
				path: 'threads',
				select: 'title slug topic upVote comments views',
				populate: {
					path: 'author',
					select: 'userName',
				},
			})
			.select(selectedData)
			.skip(skip)
			.limit(parseInt(limit as string, 10));

		const totalData = await Category.countDocuments({});
		res.status(200).json({
			status: 'success',
			pages: Math.ceil(totalData / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string),
			data: categorys,
		});
	},
);
