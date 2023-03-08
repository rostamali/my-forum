import { NextApiRequest } from 'next';

type IField = {
	title: string;
	name: string;
	type: string;
};

interface NextApiRequestExtended extends NextApiRequest {
	user: any;
	files: any;
	params: any;
}
interface JwtPayload {
	id: string;
	role: string;
	name: string;
	email: string;
	iat: number;
	exp: number;
}

interface NodeMailerOptions {
	template: string;
	subject: string;
	to: string;
}
