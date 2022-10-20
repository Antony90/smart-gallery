import { Button, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom'; 

const AlbumTile = ({ id, name, previewPhotoUrl }) => {
    const navigate = useNavigate();
    
    return (
        <ImageListItem 
            component={Button} 
            sx={{ overflow: 'hidden', m: '50px', p: 0 }}
            onClick={() => navigate(`/albums/${id}`)}
        >
            <img
                src={previewPhotoUrl}
                loading="lazy"
                style={{ borderRadius: "15px", overflow: 'hidden' }}
                alt="album preview"
            />
            <ImageListItemBar 
                title={name} 
                sx={{ 
                    borderRadius: '15px',
                    textTransform: "none",
                    fontWeight: "none",
                    textAlign: "left",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.8))"
                }} />
        </ImageListItem>
    );
};

export default AlbumTile;
