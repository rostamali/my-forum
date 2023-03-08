import mongoose from 'mongoose';

const dbConnect = async () => {
	try {
		if (mongoose.connections[0].readyState === 1) {
		}
		await mongoose.connect(process.env.MONGO_URL);
	} catch (error) {
		return Promise.reject('Something went wrong. Check your DATABASE');
	}
};

export default dbConnect;
