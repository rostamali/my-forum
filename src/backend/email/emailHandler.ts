import { NodeMailerOptions } from '@/types';
import nodemailer from 'nodemailer';

const sendEmail = async (options: NodeMailerOptions) => {
	const transporter = nodemailer.createTransport({
		port: process.env.NODE_MAILER_PORT,
		host: process.env.NODE_MAILER_HOST,
		auth: {
			user: process.env.NODE_MAILER_USER,
			pass: process.env.NODE_MAILER_PASS,
		},
	});

	const mailOptions = {
		from: 'My Forum <rostam@brandpluss.com>',
		to: options.to,
		subject: options.subject,
		html: options.template,
	};

	await transporter.sendMail(mailOptions);
};

export default sendEmail;
