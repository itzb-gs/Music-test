import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold">
              🎵 Music Catalog
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/artists"
                className="px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Artists
              </Link>
              <Link
                to="/albums"
                className="px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Albums
              </Link>
              <Link
                to="/tracks"
                className="px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Tracks
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
