import { useState } from "react";
import { connect } from 'react-redux'

import {
    ImageList,
} from "@mui/material";

import PhotoTile from "./PhotoTile";
import PhotoView from "./PhotoView";
import { selectPhoto } from "../../store/actions/photoActions";

const PhotoList = ({ photos, isSelectMode, selectPhoto, selectedPhotos }) => {
    // Photos array index for currently selected image
    // -1 => no image selected
    const [ photoIdx, setPhotoIdx ] = useState(-1);

    if (photos.length === 0) return "No photos";

    const onClickPhoto = idx => () => {
        isSelectMode ? selectPhoto(photos[idx])
         : setPhotoIdx(idx)
    }
    const photoItemComponent = photos.map(({ id, url, name, tags }, idx) => (
        <PhotoTile
            id={id}
            key={id}
            src={url}
            imgName={name}
            tags={tags}
            onClick={onClickPhoto(idx)}
            selected={selectedPhotos.find(photo => photo.id === id)}
        />
    ));
    
    return (
        <>  
            {photoIdx > -1 && <PhotoView
                {...photos[photoIdx]} 
                open={photoIdx > -1}
                // Update current image index, navigates to next/previous photo
                onClickNext={offset => {
                    const n = photos.length;
                    setPhotoIdx(idx => ((idx + offset % n) + n) % n)
                }}
                onClose={() => setPhotoIdx(-1)}
            />}
            <ImageList
                sx={{ m: 0 }}
                variant="standard"
                cols={5}
                gap={8}
                rowHeight={300}
            >
                {photoItemComponent}
            </ImageList>
        </>
    );
};


const mapStateToProps = (state, props) => {
    const photos = props.photos;
    const filter = state.filter.toLowerCase();
    
    const filteredPhotos = filter
    ? photos.filter(({ name, tags }) => {
        const includesName = name.toLowerCase().includes(filter);
        const includesAnyTag = tags.some((tag) =>
        tag.toLowerCase().includes(filter)
        );
        return includesName || includesAnyTag;
    })
    : photos;
    
    return {
        photos: filteredPhotos,
        selectedPhotos: state.photos.selected
    };
};

const mapDispatchToProps = dispatch => ({
    selectPhoto: photo => dispatch(selectPhoto(photo))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList);
