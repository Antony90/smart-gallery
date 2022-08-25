

import {
    Route,
    Routes
} from 'react-router-dom';

import PhotosPage from "./components/pages/PhotosPage";
import AlbumsPage from './components/pages/AlbumsPage';
import AlbumPhotosPage from "./components/pages/AlbumPhotosPage";
import Dashboard from './components/pages/Dashboard';
import Navigation from './components/misc/Navigation';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibraryRounded';
import PhotoIcon from '@mui/icons-material/PhotoRounded';

import {
    Box,
    Toolbar,
    Paper
} from '@mui/material/';
import { useEffect } from 'react';

import { fetchPhotos } from './store/actions/photoActions';
import 'firebase/compat/firestore';
import { connect } from 'react-redux';
import { fetchAlbums } from './store/actions/albumActions';

// TODO
// remove redux-react-firebase package
// add albRef, photoRef, storageRef, toast instead to thunk with extra args
// Dashboard page
// Use unsub in cleanup 
function App({ fetchPhotos, fetchAlbums, unsubscribe }) {

    const navItems = [
        { text: 'Dashboard', path: '/', icon: <HomeRoundedIcon/> },
        { text: 'Photos', path: '/photos', icon: <PhotoIcon/> },
        { text: 'Albums', path: '/albums', icon: <PhotoLibraryIcon/> }
    ]
    
    // Subscribe to database updates
    // Reflected in local redux state
    useEffect(() => {
        fetchPhotos()
        fetchAlbums()

        return unsubscribe;
    }, [])

    return (
        <>  
            <Navigation drawerWidth={240} navItems={navItems} />
            <Box sx={{ width: '100%' }}>
                <Toolbar />
                <Box sx={{ border: '1px solid rgba(255,255,255,0.3)', borderRadius: '10px', m: '10px',p: '10px' }}>
                    <Routes>
                        <Route path='/photos' element={<PhotosPage />} />
                        <Route path='/albums/:id' element={<AlbumPhotosPage />} />
                        <Route path='/albums' element={<AlbumsPage />} />
                        <Route path='/' element={<Dashboard />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchPhotos: (setUnsub) => dispatch(fetchPhotos(setUnsub)),
    fetchAlbums: (setUnsub) => dispatch(fetchAlbums(setUnsub)),
})

const mapStateToProps = state => ({
    unsubscribe: () => {
        const unsubPhotos = state.photos.unsub;
        const unsubAlbums = state.albums.unsub;
        unsubPhotos();
        unsubAlbums();
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
