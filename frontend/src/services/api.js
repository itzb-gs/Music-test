import { initialArtists, initialAlbums, initialTracks } from './mockData';

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage
let artists = [...initialArtists];
let albums = [...initialAlbums];
let tracks = [...initialTracks];

// Helper to get next ID
const getNextId = (array) => array.length === 0 ? 1 : Math.max(...array.map(item => item.id), 0) + 1;

// Artists API
export const artistsAPI = {
  getAll: async () => {
    await delay();
    return { data: [...artists] };
  },
  
  getById: async (id) => {
    await delay();
    const artist = artists.find(a => a.id === parseInt(id));
    if (!artist) throw new Error('Artist not found');
    return { data: artist };
  },
  
  create: async (artistData) => {
    await delay();
    const newArtist = {
      id: getNextId(artists),
      ...artistData,
    };
    artists.push(newArtist);
    return { data: newArtist };
  },
  
  update: async (id, artistData) => {
    await delay();
    const index = artists.findIndex(a => a.id === parseInt(id));
    if (index === -1) throw new Error('Artist not found');
    artists[index] = { ...artists[index], ...artistData, id: parseInt(id) };
    return { data: artists[index] };
  },
  
  delete: async (id) => {
    await delay();
    const index = artists.findIndex(a => a.id === parseInt(id));
    if (index === -1) throw new Error('Artist not found');
    // Also delete related albums and tracks
    const artistAlbums = albums.filter(a => a.artistId === parseInt(id));
    const albumIds = artistAlbums.map(a => a.id);
    albums = albums.filter(a => a.artistId !== parseInt(id));
    tracks = tracks.filter(t => !albumIds.includes(t.albumId));
    artists.splice(index, 1);
    return { data: { success: true } };
  },
};

// Albums API
export const albumsAPI = {
  getAll: async () => {
    await delay();
    return { data: [...albums] };
  },
  
  getById: async (id) => {
    await delay();
    const album = albums.find(a => a.id === parseInt(id));
    if (!album) throw new Error('Album not found');
    return { data: album };
  },
  
  getByArtist: async (artistId) => {
    await delay();
    return { data: albums.filter(a => a.artistId === parseInt(artistId)) };
  },
  
  create: async (albumData) => {
    await delay();
    const newAlbum = {
      id: getNextId(albums),
      ...albumData,
      artistId: parseInt(albumData.artistId),
    };
    albums.push(newAlbum);
    return { data: newAlbum };
  },
  
  update: async (id, albumData) => {
    await delay();
    const index = albums.findIndex(a => a.id === parseInt(id));
    if (index === -1) throw new Error('Album not found');
    albums[index] = { 
      ...albums[index], 
      ...albumData, 
      id: parseInt(id),
      artistId: parseInt(albumData.artistId),
    };
    return { data: albums[index] };
  },
  
  delete: async (id) => {
    await delay();
    const index = albums.findIndex(a => a.id === parseInt(id));
    if (index === -1) throw new Error('Album not found');
    // Also delete related tracks
    tracks = tracks.filter(t => t.albumId !== parseInt(id));
    albums.splice(index, 1);
    return { data: { success: true } };
  },
};

// Tracks API
export const tracksAPI = {
  getAll: async () => {
    await delay();
    return { data: [...tracks] };
  },
  
  getById: async (id) => {
    await delay();
    const track = tracks.find(t => t.id === parseInt(id));
    if (!track) throw new Error('Track not found');
    return { data: track };
  },
  
  getByAlbum: async (albumId) => {
    await delay();
    return { data: tracks.filter(t => t.albumId === parseInt(albumId)) };
  },
  
  create: async (trackData) => {
    await delay();
    const newTrack = {
      id: getNextId(tracks),
      ...trackData,
      albumId: parseInt(trackData.albumId),
      trackNumber: parseInt(trackData.trackNumber),
    };
    tracks.push(newTrack);
    return { data: newTrack };
  },
  
  update: async (id, trackData) => {
    await delay();
    const index = tracks.findIndex(t => t.id === parseInt(id));
    if (index === -1) throw new Error('Track not found');
    tracks[index] = { 
      ...tracks[index], 
      ...trackData, 
      id: parseInt(id),
      albumId: parseInt(trackData.albumId),
      trackNumber: parseInt(trackData.trackNumber),
    };
    return { data: tracks[index] };
  },
  
  delete: async (id) => {
    await delay();
    const index = tracks.findIndex(t => t.id === parseInt(id));
    if (index === -1) throw new Error('Track not found');
    tracks.splice(index, 1);
    return { data: { success: true } };
  },
};
