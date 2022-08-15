import { useFirestore } from "react-redux-firebase";
import { useState, useEffect } from "react";
import 'firebase/compat/firestore';

import {
    Route,
    Routes
} from 'react-router-dom';

import PhotoList from "./components/PhotoList";
import AlbumsPage from './components/pages/AlbumsPage';
import Dashboard from './components/pages/Dashboard';
import Navigation from './components/Navigation';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AlbumPhotosPage from "./components/pages/AlbumPhotosPage";

import {
    Box,
    Toolbar
} from '@mui/material/';

function App() {
    const [ allPhotos, setAllPhotos ] = useState([]);

    const firestore = useFirestore();
    // TODO turn into hook which maps files into objects
    useEffect(() => {
        firestore.collection("photos")
        .onSnapshot(snap => setAllPhotos(snap.docs))
    }, [firestore]);

    const navItems = [
        { text: 'Home', path: '/', icon: <HomeRoundedIcon/> },
        { text: 'Photos', path: '/photos', icon: <HomeRoundedIcon/> },
        { text: 'Albums', path: '/albums', icon: <HomeRoundedIcon/> }
    ]

    // TODO use firestore query to get album ids
    const nestedItems = [
        { text: 'Nature', path: '/albums/nothing' },
        { text: 'Fruit', path: '/albums/void' }
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <Navigation drawerWidth={250} navItems={navItems} nestedItems={nestedItems} />
            <Box>
                <Toolbar />
                <Routes>
                    { /* TODO should use PhotosPage to remove photos */ }
                    <Route path='/photos' element={<PhotoList photos={allPhotos} />} />
                    <Route path='/albums/:id' element={<AlbumPhotosPage />} />
                    <Route path='/albums' element={<AlbumsPage />} />
                    <Route path='/' element={<Dashboard />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default App;
