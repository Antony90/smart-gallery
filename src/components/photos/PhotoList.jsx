import { useState, createRef, useEffect } from "react";
import { connect } from 'react-redux'

import {
    ImageList,
    Dialog,
} from "@mui/material";

import PhotoItem from "./PhotoItem";
import PhotosSkeleton from "./PhotosSkeleton";
import PhotoView from "./PhotoView";
import { Masonry } from '@mui/lab/'
import { isLoaded } from "react-redux-firebase";

const PhotoList = ({ photos, filter }) => {
    // Photos array index for currently selected image
    // -1 => no image selected
    const [selectedImg, setSelectedImg] = useState(-1);
    
    if(!isLoaded(photos)) return <PhotosSkeleton />;

    const filteredPhotos = filter ?
        photos.filter(({ name, tags }) => (
            name.includes(filter) || tags.some(tag => tag.includes(filter))
        ))
        : photos;

    const photoListComponent = filteredPhotos.map(({ id, url, name, tags }, idx) => (
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
                        {...filteredPhotos[selectedImg]} 
                        // update current image index, navigates to next/previous photo
                        onClickNext={offset => {
                            const n = filteredPhotos.length;
                            setSelectedImg(idx => ((idx + offset % n) + n) % n)
                        }}
                    />
                }
            </Dialog>
            <ImageList
                sx={{ m: 0 }}
                variant="standard"
                cols={5}
                gap={8}
                rowHeight={300}
            >
                {photoListComponent}
            </ImageList>
        </>
    );
};

const mapStateToProps = (state) => ({
    filter: state.filterSort.filter
})


export default connect(mapStateToProps)(PhotoList);
