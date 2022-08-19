import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import "firebase/compat/firestore";

import PhotosList from "../photos/PhotoList";
import UploadImages from "../UploadImages";

import { Box, Fab, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { createAlbum } from "../../store/actions/albumActions";
import { clearPhotoSelection, setSelectMode } from "../../store/actions/photoActions";

const actionButtton = {
    position: 'fixed', 
    bottom: 16, 
    right: 16 
}

const PhotosPage = ({ photos, handleCreateAlbum }) => {
    const [ albumName, setAlbumName ] = useState('');
    const [ isSelectMode, setSelectMode ] = useState(false);

    return (
        <Box sx={{ position: "relative" }}>
            <PhotosList photos={photos} isSelectMode={isSelectMode} />
            <Stack direction='column' spacing={3} sx={actionButtton} alignItems='end' >
                <UploadImages/>
                <Fab 
                    variant="extended" 
                    size="large" 
                    color="primary"
                    onClick={() => {
                        // Only toggle select off, if albumName text field is empty
                        if (!albumName) 
                            setSelectMode(m => !m);
                        else {
                            handleCreateAlbum(albumName);
                            setSelectMode(false);
                        }
                    }}
                >
                    { isSelectMode && 
                        <TextField 
                            size='small' 
                            variant='outlined' 
                            sx={{ 
                                width: '180px', 
                                mr: '12px',
                                // TODO selected outline is WHITE, not dark blue
                                '& .MuiOutlinedInput-fieldset': {
                                    borderColor: 'green',
                                },
                                "& .MuiInputBase-input": {
                                    p: '5px',
                                    pl: '8px',
                                    borderColor: 'white',
                                    fontSize: '13px'
                                }
                            }}
                            onChange={e => setAlbumName(e.target.value)}
                            onClick={e => {
                                e.stopPropagation()
                                
                            }}
                            placeholder="Album name"
                        /> }
                    New album
                </Fab>
            </Stack>
        </Box>
    );
};

const mapStateToProps = state => {
    const photos = state.photos.all;
    const filter = state.filter.toLowerCase();

    const filteredPhotos = filter ?
        photos.filter(({ name, tags }) => {
            const includesName = name.toLowerCase().includes(filter) 
            const includesAnyTag = tags.some(tag => tag.toLowerCase().includes(filter))
            return (includesName || includesAnyTag);
        }) 
        : photos;

    return { 
        photos: filteredPhotos
    }
}

const mapDispatchToProps = dispatch => ({
    handleCreateAlbum: (albumName) => {
        dispatch(createAlbum(albumName))
        dispatch(clearPhotoSelection)
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);

// connect(state => ({ photos: state.firestore.ordered.photos })),
// firestoreConnect(state => {
//     // console.log(state);
//     // const where = (state.filterSort && [
//     //     ['name', '>=', state.filterSort.filter], 
//     //     [state.filterSort.filter, 'in', 'tags']
//     // ]);
//     return [{ collection: 'photos', orderBy: ['createdAt', 'desc'] }]
// }),

