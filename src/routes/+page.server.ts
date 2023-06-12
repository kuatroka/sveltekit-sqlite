import { getInitialTracks } from "$lib/server/db/sqlite";


export function load() {
    const tracks = getInitialTracks();
    // const albums = getInitialTracks();
	return {tracks}
	};


    

    