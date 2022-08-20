import { useState } from "react";
import { connect } from 'react-redux'

import {
    ImageList,
} from "@mui/material";

import PhotoItem from "./PhotoItem";
import PhotoView from "./PhotoView";
import { selectPhoto } from "../../store/actions/photoActions";

const PhotoList = ({ photos, isSelectMode, selectPhoto, selectedPhotos }) => {
    // Photos array index for currently selected image
    // -1 => no image selected
    const [ photoIdx, setPhotoIdx ] = useState(-1);

    const onClickPhoto = idx => () => {
        isSelectMode ? selectPhoto(photos[idx].id)
         : setPhotoIdx(idx)
    }
    const photoItemComponent = photos.map(({ id, url, name, tags }, idx) => (
        <PhotoItem
            id={id}
            key={id}
            src={url}
            imgName={name}
            tags={tags}
            onClick={onClickPhoto(idx)}
            selected={selectedPhotos.includes(id)}
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

const mapStateToProps = state => ({
    selectedPhotos: state.photos.selected
})

const mapDispatchToProps = dispatch => ({
    selectPhoto: id => dispatch(selectPhoto(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList);
