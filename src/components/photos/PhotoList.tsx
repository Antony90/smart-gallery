import React, { useState } from "react";

import {
    ImageList,
} from "@mui/material";

import PhotoTile from "./PhotoTile";
import PhotoView from "./PhotoView";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectPhoto, selectSelectedPhotos } from "../../store/photos";
import { PhotosMap } from "../../models/Photo";

interface PhotoListProps {
    photos: PhotosMap;
    isSelectMode: boolean;
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, isSelectMode }) => {
    const selectedPhotoIDs = useAppSelector(selectSelectedPhotos);
    const dispatch = useAppDispatch();
    const selectPhotoID = (photoID: string) => dispatch(selectPhoto(photoID));

    // Use an array of photo IDs to navigate gallery by 
    // increasing/decreasing the current photo index by 1
    const photoIDs = Object.keys(photos);
    const [ photoIndex, setPhotoIdx ] = useState(-1); // Initially hides photo modal
    const open = photoIndex !== -1; // Whether the photo view modal is open

    if (Object.keys(photos).length === 0) return <div>No photos</div>; // TODO: pick a nice icon to show

    // If not in select mode, open photo modal by setting photo index to a non-negative number
    const onClickPhoto = (index: number) => () => {
        isSelectMode ? selectPhotoID(photoIDs[index])
         : setPhotoIdx(index);
    }

    const photoTiles = Object.entries(photos).map(([id, photo], i) => (
        <PhotoTile
            id={photo.id}
            key={photo.id}
            src={photo.url}
            imgName={photo.name}
            tags={photo.tags}
            onClick={onClickPhoto(i)}
            selected={selectedPhotoIDs.find(photoID => photoID === photo.id)}
        />
    ));

    // Photo modal, appears when photo is clicked and not in select mode
    const photoView = open ? (
        <PhotoView
            photo={photos[photoIDs[photoIndex]]} 
            open={open}
            // Update current image index, navigates to next/previous photo
            onClickNext={(offset: number) => {
                // TODO: store photo IDs in photo store so index can be incremented
                // and next photo can be selected
                const n = photoIDs.length;
                setPhotoIdx(idx => ((idx + offset % n) + n) % n)
            }}
            onClose={() => setPhotoIdx(-1)}
        />
    ) : (<></>)
    
    return (
        <>  
            {photoView}
            <ImageList
                sx={{ m: 0 }}
                variant="standard"
                cols={5}
                gap={8}
                rowHeight={300}
            >
                {photoTiles}
            </ImageList>
        </>
    );
};


// const mapStateToProps = (state, props) => {
//     const photos = props.photos;
//     const filter = state.filter.toLowerCase();
    
//     const filteredPhotos = filter
//     ? photos.filter(({ name, tags }) => {
//         const includesName = name.toLowerCase().includes(filter);
//         const includesAnyTag = tags.some((tag) =>
//         tag.toLowerCase().includes(filter)
//         );
//         return includesName || includesAnyTag;
//     })
//     : photos;
    
//     return {
//         photos: filteredPhotos,
//         selectedPhotos: state.photos.selected
//     };
// };


export default PhotoList;
