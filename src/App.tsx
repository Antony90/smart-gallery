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

import { fetchPhotos } from "./store/photos";
import { fetchAlbums } from "./store/actions/albumActions";
import { fetchData, useAppDispatch } from "./store";
import { userID } from "./firebase";
import { fetchPeople } from "./store/people";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FacesPage from "./components/pages/FacesPage";
import Layout from "./components/Layout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "photos",
          element: <PhotosPage />//createAlbum={null} deleteSelectedPhotos={null} />
        }, {
          path: "faces",
          element: <FacesPage />
        }, {
          path: "albums",
          element: <AlbumsPage />
        }    
      ]
    },
  ]);
  

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchData(userID));
    }, []);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
