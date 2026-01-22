import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { artistsAPI } from '../services/api';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      setLoading(true);
      const response = await artistsAPI.getAll();
      setArtists(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load artists');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this artist? This will also delete all related albums and tracks.')) {
      return;
    }
    
    try {
      await artistsAPI.delete(id);
      await loadArtists();
    } catch (err) {
      alert('Failed to delete artist');
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
        <h1 className="text-3xl font-bold text-gray-800">Artists</h1>
        <Link
          to="/artists/new"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Artist
        </Link>
      </div>

      {artists.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg">No artists found</p>
          <Link
            to="/artists/new"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Add your first artist
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {artist.name}
                </h2>
                <p className="text-gray-600 mb-1">Genre: {artist.genre}</p>
                <p className="text-gray-600 mb-4">Country: {artist.country}</p>
                <div className="flex space-x-2">
                  <Link
                    to={`/artists/${artist.id}/edit`}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(artist.id)}
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

export default ArtistList;
