const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. Forum Category Schema
const categorySchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Category title required'],
		},
		slug: {
			type: String,
			required: [true, 'Category slug is required'],
		},
		description: {
			type: String,
			required: [true, 'Category description is required'],
		},
		tags: [
			{
				type: String,
				required: [true, 'Category tags required'],
			},
		],
		threads: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Thread',
			},
		],
		loveVote: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		background: {
			type: String,
			required: [true, 'Category background is required'],
		},
		lastActivity: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
);
// 2. Forum Thread Schema
const threadSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Thread title is required'],
	},
	slug: {
		type: String,
		required: [true, 'Thread slug is required'],
	},
	topic: {
		type: String,
		required: [true, 'Thread topic is required'],
	},
	description: {
		type: String,
		required: [true, 'Thread body is required'],
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: [true, 'Thread category is required'],
	},
	tags: [
		{
			type: String,
			required: [true, 'Thread tags required'],
		},
	],
	dateCreated: {
		type: Date,
		default: Date.now,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Thread author ID reqired'],
	},
	upVote: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	downVote: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	loveVote: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
	shared: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	views: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	subscriber: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	status: {
		type: Boolean,
		default: true,
	},
	lastActivity: {
		type: Date,
		default: Date.now,
	},
});
// 3. Forum Comment Schema
const commentSchema = new Schema({
	text: {
		type: String,
		required: [true, 'Comment text is required'],
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Comment user required'],
	},
	thread: {
		type: Schema.Types.ObjectId,
		ref: 'Thread',
		required: [true, 'Thread ID is required for comment'],
	},
	upVote: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	downVote: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	loveVote: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	lastActivity: {
		type: Date,
		default: Date.now,
	},
});
// 4. User Schema
const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: [true, 'User name is required'],
			trim: true,
			minLength: 2,
			maxLength: 30,
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Must need user email'],
			unique: true,
			lowercase: true,
		},
		profile: { type: String },
		password: {
			type: String,
			minLength: 6,
			maxLength: 120,
			required: [true, 'Must need user password'],
		},
		role: {
			type: String,
			required: true,
			default: 'user',
			enum: {
				values: ['admin', 'user', 'moderator'],
				message: 'User role is required',
			},
		},
		location: { type: String },
		website: { type: String },
		about: { type: String },
		passwordChangeAt: {
			type: Date,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
		status: {
			type: String,
			required: true,
			default: 'active',
			enum: {
				values: ['active', 'banned'],
				message: 'User status is required',
			},
		},
		lastActivity: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
);

// 5. Notification Schema
const notificationSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Must need user ID'],
		},
		text: {
			type: String,
			required: [true, 'Notification text required'],
		},
		link: {
			type: String,
			required: [true, 'Notification text required'],
		},
		read: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Thread =
	mongoose.models.Thread || mongoose.model('Thread', threadSchema);
export const Comment =
	mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export const Category =
	mongoose.models.Category || mongoose.model('Category', categorySchema);
export const Notification =
	mongoose.models.Notification ||
	mongoose.model('Notification', notificationSchema);
