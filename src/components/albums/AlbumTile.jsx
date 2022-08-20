import { Button, ImageListItem, ImageListItemBar, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom'; 

const AlbumTile = ({ id, name }) => {
    const navigate = useNavigate();
    
    return (
        <ImageListItem 
            component={Button} 
            sx={{ overflow: 'hidden', m: '50px' }}
            onClick={() => navigate(`/albums/${id}`)}
        >
            <img src="https://via.placeholder.com/300" />
            <ImageListItemBar title={name} />
        </ImageListItem>
    );
};

export default AlbumTile;
