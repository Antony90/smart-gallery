import { Button, ImageListItem, ImageListItemBar, Paper } from "@mui/material";
import React from "react";

const AlbumTile = ({ album }) => {
    return (
        <ImageListItem component={Button} sx={{ overflow: 'hidden', m: '50px' }}>
            <img src="https://via.placeholder.com/300" />
            <ImageListItemBar title={album} />
        </ImageListItem>
    );
};

export default AlbumTile;
