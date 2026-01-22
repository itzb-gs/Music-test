import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { albumsAPI, artistsAPI } from '../services/api';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [albumsResponse, artistsResponse] = await Promise.all([
        albumsAPI.getAll(),
        artistsAPI.getAll(),
      ]);
      setAlbums(albumsResponse.data);
      setArtists(artistsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to load albums');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getArtistName = (artistId) => {
    const artist = artists.find((a) => a.id === artistId);
    return artist ? artist.name : 'Unknown Artist';
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this album? This will also delete all related tracks.')) {
      return;
    }
    
    try {
      await albumsAPI.delete(id);
      await loadData();
    } catch (err) {
      alert('Failed to delete album');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Albums</h1>
        <Link
          to="/albums/new"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Album
        </Link>
      </div>

      {albums.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg">No albums found</p>
          <Link
            to="/albums/new"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Add your first album
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={album.coverUrl}
                alt={album.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {album.title}
                </h2>
                <p className="text-gray-600 mb-1">
                  Artist: {getArtistName(album.artistId)}
                </p>
                <p className="text-gray-600 mb-4">Year: {album.year}</p>
                <div className="flex space-x-2">
                  <Link
                    to={`/albums/${album.id}/edit`}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(album.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumList;
