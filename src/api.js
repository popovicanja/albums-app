import { client } from "./utils/api-client";
import { queryString } from "./utils/helpers";

async function fetchAlbums(limit = 10, q = "") {
  const albums = await client(`albums${queryString({ _limit: limit, q })}`);
  return albums.filter((album) => album.title);
}

async function fetchArtists(ids = []) {
  const artists = await client(`artists${queryString({ id: ids })}`);
  const map = {};
  for (const artist of artists) {
    if (!map[artist.id]) {
      map[artist.id] = artist.title;
    }
  }
  return map;
}

function fetchArtist(artistId) {
  return client(`artists/${artistId}`);
}

function fetchArtistAlbums(artistId) {
  return client(`albums?artistId=${artistId}`);
}

/**
 * Get albums data with artistName mapped
 * @param limit
 * @param query
 */
async function getAlbums(limit, query) {
  const albums = await fetchAlbums(limit, query);
  const artistIds = albums.map((el) => el.artistId);
  const artists = await fetchArtists(artistIds);
  return albums.map((album) => ({
    ...album,
    artistName: artists[album.artistId],
  }));
}

/**
 * Get artist data and albums data mapped with artist name
 * @param id
 */
async function getArtist(id) {
  return Promise.all([fetchArtist(id), fetchArtistAlbums(id)]).then(
    ([artist, albums]) => ({
      artist,
      albums: albums.map((album) => ({
        ...album,
        artistName: artist.title,
      })),
    })
  );
}

function updateFavoriteStatus(album) {
  return client(`albums/${album.id}`, {
    method: "PUT",
    body: JSON.stringify(album),
    headers: { "Content-Type": "application/json" },
  });
}

export { getAlbums, getArtist, updateFavoriteStatus };
