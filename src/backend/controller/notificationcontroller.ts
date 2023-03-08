import { NextApiRequestExtended } from '@/types';
import CatchAsync from '@/utils/catchAsync';
import { NextApiResponse } from 'next';
import { Notification } from '../model';

export const notificationReadStatus = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const notification = await Notification.findByIdAndUpdate(
			req.params.id,
			{
				read: true,
			},
		);
		if (!notification) throw new Error('Notification not found');
		res.status(200).json({
			status: 'success',
		});
	},
);
