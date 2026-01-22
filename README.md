# Music Catalog Application - MVP

A simple music catalog web application built with React, Vite, and Tailwind CSS. This application allows you to manage artists, albums, and tracks with full CRUD (Create, Read, Update, Delete) functionality using mock data.

## Features

- ✨ **Full CRUD Operations**: Add, edit, view, and delete artists, albums, and tracks
- 🎨 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎵 **Music Management**: Organize your music collection with a clean, intuitive interface
- 🚀 **Fast & Modern**: Built with Vite for lightning-fast development and builds
- 💅 **Beautiful UI**: Styled with Tailwind CSS for a modern look and feel

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Mock Data**: In-memory data storage

## Project Structure

```
Music-test/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx          # Main layout with navigation
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── ArtistList.jsx      # List all artists
│   │   │   ├── ArtistForm.jsx      # Create/edit artist
│   │   │   ├── AlbumList.jsx       # List all albums
│   │   │   ├── AlbumForm.jsx       # Create/edit album
│   │   │   ├── TrackList.jsx       # List all tracks
│   │   │   └── TrackForm.jsx       # Create/edit track
│   │   ├── services/
│   │   │   ├── mockData.js         # Initial mock data
│   │   │   └── api.js              # Mock API service
│   │   ├── App.jsx                 # Main app component with routing
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Tailwind imports
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Music-test
```

2. Install dependencies:
```bash
cd frontend
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

### Artists Management
- Navigate to the **Artists** page to view all artists
- Click **Add New Artist** to create a new artist
- Click **Edit** on any artist card to update their information
- Click **Delete** to remove an artist (this will also delete all related albums and tracks)

### Albums Management
- Navigate to the **Albums** page to view all albums
- Click **Add New Album** to create a new album
- Select an artist from the dropdown when creating/editing an album
- Click **Edit** or **Delete** to manage albums

### Tracks Management
- Navigate to the **Tracks** page to view all tracks in a table format
- Click **Add New Track** to create a new track
- Select an album from the dropdown when creating/editing a track
- Click **Edit** or **Delete** to manage tracks

## Mock Data

The application uses in-memory mock data that simulates a backend API. The data persists during the session but resets when you refresh the page. Initial data includes:

- 3 Artists (The Beatles, Miles Davis, Pink Floyd)
- 4 Albums
- 10 Tracks

## API Structure

The mock API simulates RESTful endpoints with the following structure:

### Artists API
- `getAll()` - Get all artists
- `getById(id)` - Get a specific artist
- `create(data)` - Create a new artist
- `update(id, data)` - Update an artist
- `delete(id)` - Delete an artist

### Albums API
- `getAll()` - Get all albums
- `getById(id)` - Get a specific album
- `getByArtist(artistId)` - Get albums by artist
- `create(data)` - Create a new album
- `update(id, data)` - Update an album
- `delete(id)` - Delete an album

### Tracks API
- `getAll()` - Get all tracks
- `getById(id)` - Get a specific track
- `getByAlbum(albumId)` - Get tracks by album
- `create(data)` - Create a new track
- `update(id, data)` - Update a track
- `delete(id)` - Delete a track

## Future Enhancements

- Add search and filter functionality
- Implement pagination for large datasets
- Add user authentication
- Connect to a real backend API
- Add music player functionality
- Implement drag-and-drop for track ordering
- Add image upload functionality

## License

MIT