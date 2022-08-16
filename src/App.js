

import {
    Route,
    Routes
} from 'react-router-dom';

import PhotosPage from "./components/pages/PhotosPage";
import AlbumsPage from './components/pages/AlbumsPage';
import AlbumPhotosPage from "./components/pages/AlbumPhotosPage";
import Dashboard from './components/pages/Dashboard';
import Navigation from './components/Navigation';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibraryRounded';
import PhotoIcon from '@mui/icons-material/PhotoRounded';

import {
    Box,
    Toolbar,
    Paper
} from '@mui/material/';

function App() {
    const navItems = [
        { text: 'Home', path: '/', icon: <HomeRoundedIcon/> },
        { text: 'Photos', path: '/photos', icon: <PhotoIcon/> },
        { text: 'Albums', path: '/albums', icon: <PhotoLibraryIcon/> }
    ]

    // TODO use firestore query to get album ids
    const nestedItems = [
        { text: 'Nature', path: '/albums/nothing' },
        { text: 'Fruit', path: '/albums/void' }
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <Navigation drawerWidth={250} navItems={navItems} nestedItems={nestedItems} />
            <Box sx={{ width: '100%' }}>
                <Toolbar />
                <Paper variant='outlined' sx={{ height: 'inherit', m: '10px',p: '5px' }}>
                    <Routes>
                        <Route path='/photos' element={<PhotosPage />} />
                        <Route path='/albums/:id' element={<AlbumPhotosPage />} />
                        <Route path='/albums' element={<AlbumsPage />} />
                        <Route path='/' element={<Dashboard />} />
                    </Routes>
                </Paper>
            </Box>
        </Box>
    );
};

export default App;
