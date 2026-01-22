import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tracksAPI, albumsAPI } from '../services/api';

const TrackForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    albumId: '',
    duration: '',
    trackNumber: 1,
  });
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAlbums();
    if (isEdit) {
      loadTrack();
    }
  }, [id]);

  const loadAlbums = async () => {
    try {
      const response = await albumsAPI.getAll();
      setAlbums(response.data);
    } catch (err) {
      console.error('Failed to load albums:', err);
    }
  };

  const loadTrack = async () => {
    try {
      setLoading(true);
      const response = await tracksAPI.getById(id);
      setFormData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load track');
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
    
    if (!formData.albumId) {
      setError('Please select an album');
      return;
    }

    try {
      setLoading(true);
      if (isEdit) {
        await tracksAPI.update(id, formData);
      } else {
        await tracksAPI.create(formData);
      }
      navigate('/tracks');
    } catch (err) {
      setError('Failed to save track');
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
        {isEdit ? 'Edit Track' : 'Add New Track'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
            Track Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter track title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="albumId" className="block text-gray-700 font-semibold mb-2">
            Album *
          </label>
          <select
            id="albumId"
            name="albumId"
            value={formData.albumId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an album</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="trackNumber" className="block text-gray-700 font-semibold mb-2">
            Track Number *
          </label>
          <input
            type="number"
            id="trackNumber"
            name="trackNumber"
            value={formData.trackNumber}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="duration" className="block text-gray-700 font-semibold mb-2">
            Duration *
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 3:45"
          />
          <p className="text-sm text-gray-500 mt-1">Format: MM:SS</p>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Track' : 'Create Track'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/tracks')}
            className="flex-1 bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackForm;
