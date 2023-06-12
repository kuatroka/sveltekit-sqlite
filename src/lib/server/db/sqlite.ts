import { DB_PATH } from "$env/static/private";
import Database from "better-sqlite3";
import type { Track, Album, AlbumTrack } from "./types";

const db = new Database(DB_PATH, {verbose: console.log}); // remove in prod

export function getInitialTracks(limit=50): Track[] {
    const sql = `
    select t.TrackId as trackId
    , t.Name as trackName
    , a.AlbumId as albumId
    , a.Title as albumTitle
    , at.ArtistId as artistId
    , at.Name as artistName
    , g.Name as genre
    from Track t
    join Album a
    on t.AlbumId = a.AlbumId
    join Artist as at
    on a.ArtistId = at.ArtistId
    join Genre as g
    on t.GenreId = g.GenreId
    LIMIT $limit 
    `;
    const stmnt = db.prepare(sql);
    const rows = stmnt.all({ limit });
    return rows as Track[];
};

export function getAlbumById(albumId: number): Album {
	const sql = `
    select a.AlbumId as albumId,
        a.Title as albumTitle,
        at.ArtistId as artistId,
        at.Name as artistName
    from Album as a
    join Artist as at on a.AlbumId = at.ArtistId
    where a.AlbumId = $albumId;
    `;
        const stmnt = db.prepare(sql);
        const row = stmnt.get({ albumId });
        return row as Album;
    };


export function searchTracks(searchTerm: string, limit = 50): Track[] {
	const sql = `
    select  t.TrackId as trackId,
            t.Name as trackName,
            a.AlbumId as albumId,
            a.Title as albumTitle,
            at.ArtistId as artistId,
            at.Name as artistName,
            g.Name as genre
    from Track t
    join Album a
    on t.AlbumId = a.AlbumId
    join Artist at
    on a.ArtistId = at.ArtistId
    join Genre g
    on t.GenreId = g.GenreId
    where lower(t.Name) like lower('%' || $searchTerm || '%')
    limit $limit  
  `;
	const stmnt = db.prepare(sql);
	const rows = stmnt.all({ searchTerm, limit });
	return rows as Track[];
}


export function getAlbumTracks(albumId: number): AlbumTrack[] {
	const sql = `
  select t.TrackId as trackId,
        t.Name as trackName,
        t.Milliseconds as trackMs
  from Track as t
  where t.AlbumId = $albumId
  order by t.TrackId
`;
	const stmnt = db.prepare(sql);
	const rows = stmnt.all({ albumId });
	return rows as AlbumTrack[];
}

export function updateAlbumTitle(albumId: number, albumTitle: string): void {
	const sql = `
  update Album
  set Title = $albumTitle
  where AlbumId = $albumId
`;
	const stmnt = db.prepare(sql);
	stmnt.run({ albumId, albumTitle });
}

