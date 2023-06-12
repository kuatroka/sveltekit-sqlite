import { getAlbumById, getAlbumTracks, updateAlbumTitle } from "$lib/server/db/sqlite";
import { error, type Actions } from '@sveltejs/kit';

export function load({ params}) {
    const albumId = parseInt(params.albumId);
    if (!albumId) {
		throw error(404, 'Album not found');
	}

    const album = getAlbumById(albumId);
    if (!album) {
		throw error(404, 'Album not found');
	}
    const tracks = getAlbumTracks(albumId)
    if (!tracks) {
		throw error(404, 'Album not found');
	}
    return  { tracks, album  } ;
	};

    export const actions: Actions = {
        updateAlbumTitle: async ({request }) => {
            const data = await request.formData();
            const albumIdstr = data.get('albumId')?.toString();
            const albumId = albumIdstr ? parseInt(albumIdstr) : null;
            const albumTitle = data.get('albumTitle')?.toString();

            if (!(albumId && albumTitle)) {   
                throw error(400, 'Missing albumId or albumTitle');
                }
            updateAlbumTitle(albumId, albumTitle);
            },
            deleteAlbum: async ({request }) => { // placeholder - nost implemented yet

            }
    };