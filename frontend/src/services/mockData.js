// Mock data for artists, albums, and tracks
export const initialArtists = [
  { id: 1, name: 'The Beatles', genre: 'Rock', country: 'UK', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Miles Davis', genre: 'Jazz', country: 'USA', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Pink Floyd', genre: 'Progressive Rock', country: 'UK', imageUrl: 'https://via.placeholder.com/150' },
];

export const initialAlbums = [
  { id: 1, title: 'Abbey Road', artistId: 1, year: 1969, coverUrl: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Let It Be', artistId: 1, year: 1970, coverUrl: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Kind of Blue', artistId: 2, year: 1959, coverUrl: 'https://via.placeholder.com/150' },
  { id: 4, title: 'Dark Side of the Moon', artistId: 3, year: 1973, coverUrl: 'https://via.placeholder.com/150' },
];

export const initialTracks = [
  { id: 1, title: 'Come Together', albumId: 1, duration: '4:20', trackNumber: 1 },
  { id: 2, title: 'Something', albumId: 1, duration: '3:03', trackNumber: 2 },
  { id: 3, title: 'Here Comes the Sun', albumId: 1, duration: '3:05', trackNumber: 7 },
  { id: 4, title: 'Let It Be', albumId: 2, duration: '4:03', trackNumber: 1 },
  { id: 5, title: 'Get Back', albumId: 2, duration: '3:09', trackNumber: 4 },
  { id: 6, title: 'So What', albumId: 3, duration: '9:22', trackNumber: 1 },
  { id: 7, title: 'Freddie Freeloader', albumId: 3, duration: '9:46', trackNumber: 2 },
  { id: 8, title: 'Speak to Me', albumId: 4, duration: '1:30', trackNumber: 1 },
  { id: 9, title: 'Breathe', albumId: 4, duration: '2:43', trackNumber: 2 },
  { id: 10, title: 'Time', albumId: 4, duration: '6:53', trackNumber: 4 },
];
