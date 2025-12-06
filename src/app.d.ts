/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly JWT_SECRET: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		user?: {
			id: number;
			email: string;
			username: string;
		};
	}
}
