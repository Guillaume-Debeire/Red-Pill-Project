import { prisma } from '$lib/server/prisma.server';
import { PUBLIC_TMDB_KEY } from '$env/static/public';
import { TMDB_API } from '$lib/services/tmdb/tmdb';
import { getOrCreateFilmByTmdbId } from '$lib/server/getOrCreateFilmByTmdbId.server';

export async function POST({ request, locals }) {
	try {
		/* ────────────────────────────────
		   1️⃣ AUTH + INPUT
		──────────────────────────────── */
		const user = locals.user;
		if (!user) {
			return new Response('Accès non autorisé', { status: 401 });
		}

		const { collectionId, entryStatus } = await request.json();

		if (!collectionId || !entryStatus) {
			return new Response('Champs manquants', { status: 400 });
		}

		/* ────────────────────────────────
		   2️⃣ USER COLLECTION ENTRY (idempotent)
		──────────────────────────────── */
		const existingEntry = await prisma.userCollectionEntry.findUnique({
			where: {
				userId_collectionId: {
					userId: user.id,
					collectionId
				}
			}
		});

		if (existingEntry) {
			return Response.json(existingEntry);
		}

		await prisma.userCollectionEntry.create({
			data: {
				userId: user.id,
				collectionId,
				entryStatus
			}
		});

		/* ────────────────────────────────
		   3️⃣ FETCH COLLECTION TMDB (UNE SEULE FOIS)
		──────────────────────────────── */
		const tmdbRes = await fetch(
			`${TMDB_API}/collection/${collectionId}?api_key=${PUBLIC_TMDB_KEY}&language=fr-FR`
		);

		if (!tmdbRes.ok) {
			return new Response('Collection TMDB introuvable', { status: 404 });
		}

		const tmdbCollection = await tmdbRes.json();

		/* ────────────────────────────────
		   4️⃣ S’ASSURER QUE LA COLLECTION EXISTE EN DB
		──────────────────────────────── */
		await prisma.belongsToCollection.upsert({
			where: { tmdbId: tmdbCollection.id },
			update: {},
			create: {
				tmdbId: tmdbCollection.id,
				name: tmdbCollection.name,
				posterPath: tmdbCollection.poster_path,
				backdropPath: tmdbCollection.backdrop_path
			}
		});

		/* ────────────────────────────────
		   5️⃣ FILMS + USER FILM ENTRIES
		──────────────────────────────── */
		for (const tmdbFilm of tmdbCollection.parts) {
			// 5a. Film (DB)
			const film = await getOrCreateFilmByTmdbId(tmdbFilm.id);

			if (!film) {
				console.error('Impossible de créer le film', tmdbFilm.id);
				continue;
			}

			// 5c. UserFilmEntry (idempotent)
			await prisma.userFilmEntry.upsert({
				where: {
					userId_filmId: {
						userId: user.id,
						filmId: film.tmdbId
					}
				},
				update: {},
				create: {
					userId: user.id,
					filmId: film.tmdbId,
					entryStatus: 'PAS_VU'
				}
			});
		}

		/* ────────────────────────────────
		   6️⃣ RETOUR FINAL COHÉRENT
		──────────────────────────────── */
		const result = await prisma.userCollectionEntry.findUnique({
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
							include: {
								users: {
									where: { userId: user.id }
								}
							}
						}
					}
				}
			}
		});

		return Response.json(result);
	} catch (e) {
		console.error(e);
		return new Response('Erreur serveur', { status: 500 });
	}
}
