import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tracksAPI, albumsAPI, artistsAPI } from '../services/api';

const TrackList = () => {
  const [tracks, setTracks] = useState([]);
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
      const [tracksResponse, albumsResponse, artistsResponse] = await Promise.all([
        tracksAPI.getAll(),
        albumsAPI.getAll(),
        artistsAPI.getAll(),
      ]);
      setTracks(tracksResponse.data);
      setAlbums(albumsResponse.data);
      setArtists(artistsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to load tracks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAlbumTitle = (albumId) => {
    const album = albums.find((a) => a.id === albumId);
    return album ? album.title : 'Unknown Album';
  };

  const getArtistName = (albumId) => {
    const album = albums.find((a) => a.id === albumId);
    if (!album) return 'Unknown Artist';
    const artist = artists.find((a) => a.id === album.artistId);
    return artist ? artist.name : 'Unknown Artist';
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this track?')) {
      return;
    }
    
    try {
      await tracksAPI.delete(id);
      await loadData();
    } catch (err) {
      alert('Failed to delete track');
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
        <h1 className="text-3xl font-bold text-gray-800">Tracks</h1>
        <Link
          to="/tracks/new"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Track
        </Link>
      </div>

      {tracks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg">No tracks found</p>
          <Link
            to="/tracks/new"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Add your first track
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Album
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tracks.map((track) => (
                <tr key={track.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {track.trackNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {track.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {getAlbumTitle(track.albumId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {getArtistName(track.albumId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {track.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/tracks/${track.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(track.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrackList;
