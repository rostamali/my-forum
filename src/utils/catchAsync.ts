import { NextApiRequest, NextApiResponse } from 'next';
// Handle Validation Error
const handleValidatorError = (err: any, res: NextApiResponse) => {
	const errors = Object.values(err.errors).map((el: any) => {
		return el.message;
	});
	const message = `${errors.join('. ')}`;
	return res.status(200).json({
		status: 'fail',
		message,
	});
};
// Handle Duplicate Error
const handleDuplicaterDB = (err: any, res: NextApiResponse) => {
	const message = `'${
		err.keyValue.name ? err.keyValue.name : err.keyValue.title
	}' is already exit!`;
	return res.status(200).json({
		status: 'fail',
		message,
	});
};

const CatchAsync = (handler: any) => {
	return async (req: NextApiRequest, res: NextApiResponse, next: any) => {
		return handler(req, res, next).catch((error: any) => {
			if (error.code === 11000) {
				handleDuplicaterDB(error, res);
			} else if (error.name === 'ValidationError') {
				handleValidatorError(error, res);
			}
			res.status(200).json({
				status: 'fail',
				message: error.message || error,
			});
		});
	};
};
export default CatchAsync;
