import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to Music Catalog
        </h1>
        <p className="text-xl text-gray-600">
          Manage your music collection with ease
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/artists"
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <div className="text-4xl mb-4">🎤</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Artists</h2>
          <p className="text-gray-600">
            Browse and manage your favorite artists
          </p>
        </Link>

        <Link
          to="/albums"
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <div className="text-4xl mb-4">💿</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Albums</h2>
          <p className="text-gray-600">
            Explore albums from various artists
          </p>
        </Link>

        <Link
          to="/tracks"
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <div className="text-4xl mb-4">🎵</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tracks</h2>
          <p className="text-gray-600">
            Discover and organize your music tracks
          </p>
        </Link>
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Full CRUD operations for Artists, Albums, and Tracks</li>
          <li>Responsive design that works on all devices</li>
          <li>Easy-to-use interface with intuitive navigation</li>
          <li>Mock data for testing and demonstration</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
