import { useState } from "react";

import {
    ImageList,
    Dialog,
} from "@mui/material";

import PhotoItem from "./PhotoItem";
import PhotosSkeleton from "./PhotosSkeleton";
import PhotoView from "./PhotoView";
import { isLoaded } from "react-redux-firebase";

const PhotoList = ({ photos }) => {
    // Photos array index for currently selected image
    // -1 => no image selected
    const [selectedImg, setSelectedImg] = useState(-1);
    
    if(!isLoaded(photos)) return <PhotosSkeleton />;

    const photoListComponent = photos.map(({ id, url, name, tags }, idx) => (
        <PhotoItem
            id={id}
            onClick={() => setSelectedImg(idx)}
            src={url}
            imgName={name}
            tags={tags}
            key={id}
        />
    ));
    
    return (
        <>
            <Dialog open={selectedImg > -1} onClose={() => setSelectedImg(-1)}>
                { selectedImg > -1 && 
                    <PhotoView 
                        {...photos[selectedImg]} 
                        // update current image index, navigates to next/previous photo
                        onClickNext={offset => {
                            const n = photos.length;
                            setSelectedImg(idx => ((idx + offset % n) + n) % n)
                        }}
                    />
                }
            </Dialog>
            <ImageList
                sx={{ m: 0 }}
                variant="masonry"
                cols={5}
                gap={8}
                rowHeight="auto"
            >
                {photoListComponent}
            </ImageList>
        </>
    );
};

export default PhotoList;
