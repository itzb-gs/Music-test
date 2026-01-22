import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ArtistList from './pages/ArtistList';
import ArtistForm from './pages/ArtistForm';
import AlbumList from './pages/AlbumList';
import AlbumForm from './pages/AlbumForm';
import TrackList from './pages/TrackList';
import TrackForm from './pages/TrackForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="artists" element={<ArtistList />} />
          <Route path="artists/new" element={<ArtistForm />} />
          <Route path="artists/:id/edit" element={<ArtistForm />} />
          <Route path="albums" element={<AlbumList />} />
          <Route path="albums/new" element={<AlbumForm />} />
          <Route path="albums/:id/edit" element={<AlbumForm />} />
          <Route path="tracks" element={<TrackList />} />
          <Route path="tracks/new" element={<TrackForm />} />
          <Route path="tracks/:id/edit" element={<TrackForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
