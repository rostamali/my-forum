declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGO_URL: string;
			BASE_URL: string;
			JWT_RESET_PASSWORD_SECRET: string;
			JWT_RESET_TOKEN_EXPIRES_IN: string;
			JWT_SIGNUP_PASSWORD_SECRET: string;
			JWT_SIGNUP_TOKEN_EXPIRES_IN: string;
			NODE_MAILER_PORT: number;
			NODE_MAILER_HOST: string;
			NODE_MAILER_USER: string;
			NODE_MAILER_PASS: string;
		}
	}
}

export {};
