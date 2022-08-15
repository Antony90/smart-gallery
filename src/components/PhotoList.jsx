import { useState } from "react";

import {
    ImageListItem,
    ImageList,
    ImageListItemBar,
    Paper,
    Dialog,
    Box
} from "@mui/material";

import {
    Button,

} from '@mui/joy';
import UploadImages from "./UploadImages";

const PhotoList = ({ photos }) => {
    // Photos array index for currently selected image
    // -1 => no image selected
    const [ selectedImg, setSelectedImg ] = useState(-1);

    // TODO runs twice on component render
    const photoListComponent = photos.map((photo, idx) => {
        const img = photo.data();
        // TODO  uninstall materialui/core, /icons and mui-image
        return (
            <Button key={photo.id} sx={{ p: 0, mb: "8px", mr: "8px" }} onClick={() => setSelectedImg(idx)}>
                <ImageListItem>
                    <img
                        src={img.url}
                        srcSet={img.url}
                        alt={img.name}
                        loading="lazy"
                        style={{ borderRadius: "5px" }}
                    />
                    <ImageListItemBar
                        subtitle={img.tags
                            .map(
                                (tag) => tag[0].toUpperCase() + tag.substring(1)
                            )
                            .join(", ")}
                        sx={{
                            borderRadius: "5px",
                            textTransform: "none",
                            fontWeight: "none",
                            textAlign: "left",
                            background:
                                "linear-gradient(transparent, rgba(0,0,0,0.8))",
                        }}
                    />
                </ImageListItem>
            </Button>
        );
    });

    return (
        <Box sx={{ position: "relative", width: 'fit-content' }}>
            <Dialog open={selectedImg > -1} onClose={() => setSelectedImg(-1)}>
                {selectedImg > -1 && 2}
            </Dialog>
            <Paper
                sx={{ width: 800, height: 800, mx: "auto", overflowY: "auto" }}
                variant="outlined"
            >
                <ImageList
                    sx={{ m: 0 }}
                    variant="masonry"
                    cols={3}
                    gap={0}
                    rowHeight="auto"
                >
                    {photoListComponent}
                </ImageList>
            </Paper>
            <UploadImages
                sx={{ position: "absolute", bottom: 16, right: 16 }}
            />
        </Box>
    );
};

export default PhotoList;
