import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 jours en secondes

export type JWTPayload = {
	id: number;
	email: string;
	username?: string | null;
};

// génère un token signé
export function createJwt(payload: JWTPayload) {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// vérifie et retourne le payload ou lance
export function verifyJwt(token: string): JWTPayload {
	return jwt.verify(token, JWT_SECRET) as JWTPayload;
}
