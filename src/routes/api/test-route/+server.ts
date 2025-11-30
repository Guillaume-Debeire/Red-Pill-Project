import { json } from '@sveltejs/kit';

export async function GET() {
	console.log('api connected');
	return json({ message: 'ok' });
}
