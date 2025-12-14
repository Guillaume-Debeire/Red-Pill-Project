import { prisma } from '$lib/server/prisma.server';

export async function POST({ request }) {
	try {
		const body = await request.json();

		const { tmdbId, name, posterPath, backdropPath } = body;

		if (!tmdbId || !name) {
			return new Response('Champs manquants', { status: 400 });
		}

		// 1️⃣ Vérifier si la collection existe déjà
		const existingCollection = await prisma.belongsToCollection.findUnique({
			where: { id: tmdbId }
		});

		if (existingCollection) {
			return new Response(JSON.stringify(existingCollection), {
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// 2️⃣ Création
		const collection = await prisma.belongsToCollection.create({
			data: {
				tmdbId: tmdbId, // 👈 IMPORTANT : on force l'id TMDB
				name,
				posterPath,
				backdropPath
			}
		});

		return new Response(JSON.stringify(collection), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (e) {
		console.error(e);
		return new Response('Erreur serveur', { status: 500 });
	}
}
