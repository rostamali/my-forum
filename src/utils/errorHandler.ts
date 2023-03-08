import { NextApiRequest, NextApiResponse } from 'next';
export const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
	res.status(404).json({
		status: 'fail',
		message: `Request url: ${req.url} not found.`,
	});
};
export const onError = (
	err: any,
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	res.status(404).json({
		status: 'fail',
		message: err,
	});
};
