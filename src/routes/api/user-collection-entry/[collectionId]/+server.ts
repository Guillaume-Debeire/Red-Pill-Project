import { prisma } from '$lib/server/prisma.server';

export async function GET({ params, locals }) {
	const user = locals.user;
	if (!user) {
		return new Response('Accès non autorisé', { status: 401 });
	}

	const collectionId = Number(params.collectionId);
	if (Number.isNaN(collectionId)) {
		return new Response('ID invalide', { status: 400 });
	}

	const userCollectionEntry = await prisma.userCollectionEntry.findUnique({
		where: {
			userId_collectionId: {
				userId: user.id,
				collectionId
			}
		},
		include: {
			collection: {
				include: {
					films: {
						orderBy: {
							releaseDate: 'asc'
						}
					}
				}
			}
		}
	});

	console.log('userCollection entry API:', JSON.stringify(userCollectionEntry?.collection));

	if (!userCollectionEntry) {
		return new Response('Collection non trouvée', { status: 404 });
	}

	return new Response(JSON.stringify(userCollectionEntry), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
