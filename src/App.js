import { Route, Routes } from "react-router-dom";

import PhotosPage from "./components/pages/PhotosPage";
import AlbumsPage from "./components/pages/AlbumsPage";
import AlbumPhotosPage from "./components/pages/AlbumPhotosPage";
import Dashboard from "./components/pages/Dashboard";
import Navigation from "./components/misc/Navigation";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibraryRounded";
import PhotoIcon from "@mui/icons-material/PhotoRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { Box, Toolbar, Typography, Link } from "@mui/material/";
import { useEffect } from "react";

import { fetchPhotos } from "./store/actions/photoActions";
import "firebase/compat/firestore";
import { connect } from "react-redux";
import { fetchAlbums } from "./store/actions/albumActions";
import LoginPage from "./components/pages/LoginPage";
import ProtectedRoute from "./components/misc/PrivateRoute";

// TODO
// remove redux-react-firebase package
// add albRef, photoRef, storageRef, toast instead to thunk with extra args
// Dashboard page
// Use unsub in cleanup
function App({ fetchPhotos, fetchAlbums, unsubscribe, user }) {
    const navItems = [
        {
            text: "Dashboard",
            path: "/",
            icon: <HomeRoundedIcon />,
            key: "dashboard",
        },
        { text: "Photos", path: "/photos", icon: <PhotoIcon />, key: "photos" },
        {
            text: "Albums",
            path: "/albums",
            icon: <PhotoLibraryIcon />,
            key: "albums",
        },
    ];

    // Subscribe to database updates
    // Reflected in local redux state
    useEffect(() => {
        // if (Object.keys(user).length !== 0) {
        //     // user is not {}
        // }
        fetchPhotos();
        fetchAlbums();
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navigation drawerWidth={240} navItems={navItems} />
            <Box sx={{ width: "100%" }}>
                <Toolbar />
                <Box
                    sx={{
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "10px",
                        m: "10px",
                        p: "10px",
                    }}
                >
                    <Routes>
                        {/* <Route path="/login" element={<LoginPage />} /> */}
                        <Route path="/photos" element={<PhotosPage />} />
                        <Route
                            path="/albums/:id"
                            element={<AlbumPhotosPage />}
                        />
                        <Route path="/albums" element={<AlbumsPage />} />
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </Box>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    padding={2}
                >
                    <Link
                        color="inherit"
                        href="https://github.com/Antony90/smart-gallery/"
                        target="_blank"
                    >
                        Smart Gallery
                    </Link>{" "}
                    <OpenInNewRoundedIcon
                        sx={{
                            position: "relative",
                            top: "2px",
                            fontSize: "small",
                        }}
                    />{" "}
                    by Antony90
                </Typography>
            </Box>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    fetchPhotos: (setUnsub) => dispatch(fetchPhotos(setUnsub)),
    fetchAlbums: (setUnsub) => dispatch(fetchAlbums(setUnsub)),
});

const mapStateToProps = (state) => ({
    unsubscribe: () => {
        const unsubPhotos = state.photos.unsub;
        const unsubAlbums = state.albums.unsub;
        unsubPhotos();
        unsubAlbums();
    },
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
