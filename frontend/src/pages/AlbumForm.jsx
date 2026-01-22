import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { albumsAPI, artistsAPI } from '../services/api';

const AlbumForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    artistId: '',
    year: new Date().getFullYear(),
    coverUrl: '',
  });
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArtists();
    if (isEdit) {
      loadAlbum();
    }
  }, [id]);

  const loadArtists = async () => {
    try {
      const response = await artistsAPI.getAll();
      setArtists(response.data);
    } catch (err) {
      console.error('Failed to load artists:', err);
    }
  };

  const loadAlbum = async () => {
    try {
      setLoading(true);
      const response = await albumsAPI.getById(id);
      setFormData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load album');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.artistId) {
      setError('Please select an artist');
      return;
    }

    try {
      setLoading(true);
      if (isEdit) {
        await albumsAPI.update(id, formData);
      } else {
        await albumsAPI.create(formData);
      }
      navigate('/albums');
    } catch (err) {
      setError('Failed to save album');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEdit ? 'Edit Album' : 'Add New Album'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
            Album Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter album title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="artistId" className="block text-gray-700 font-semibold mb-2">
            Artist *
          </label>
          <select
            id="artistId"
            name="artistId"
            value={formData.artistId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an artist</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700 font-semibold mb-2">
            Release Year *
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            min="1900"
            max={new Date().getFullYear() + 5}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="coverUrl" className="block text-gray-700 font-semibold mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverUrl"
            name="coverUrl"
            value={formData.coverUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/cover.jpg"
          />
          {formData.coverUrl && (
            <img
              src={formData.coverUrl}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Album' : 'Create Album'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/albums')}
            className="flex-1 bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlbumForm;
