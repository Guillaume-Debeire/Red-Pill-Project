import { prisma } from '$lib/server/prisma.server';

export async function GET({ params }) {
	const collectionId = Number(params.id);

	if (Number.isNaN(collectionId)) {
		return new Response('ID invalide', { status: 400 });
	}

	const collection = await prisma.belongsToCollection.findUnique({
		where: {
			tmdbId: collectionId
		},
		include: {
			films: {
				orderBy: {
					releaseDate: 'asc'
				}
			}
			// userCollectionEntries: true // à activer si besoin
		}
	});

	if (!collection) {
		return new Response('Collection non trouvée', { status: 404 });
	}

	return new Response(JSON.stringify(collection), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
