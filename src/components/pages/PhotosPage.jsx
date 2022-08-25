import { connect } from "react-redux";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import PhotosList from "../photos/PhotoList";

import { Box } from "@mui/material";
import { useState } from "react";
import { createAlbum } from "../../store/actions/albumActions";
import {
    clearPhotoSelection,
    deleteSelectedPhotos,
    uploadPhotos,
} from "../../store/actions/photoActions";
import { DeleteRounded, SelectAllRounded } from "@mui/icons-material";
import UploadIcon from '@mui/icons-material/CloudUpload';

import AlbumDialog from "../albums/AlbumDialog";
import ActionButton from "../misc/ActionButton";
import ActionButtonStack from "../misc/ActionButtonStack";
import FileBase64 from "react-file-base64";



const PhotosPage = ({ photos, createAlbum, deleteSelectedPhotos, uploadPhotos }) => {
    const [isSelectMode, setSelectMode] = useState(false);
    const [openAlbumDialog, setOpenAlbumDialog] = useState(false);

    const NewAlbumButton = () => (
        <ActionButton
            label="New album"
            icon={<DeleteRounded />}
            onClick={() => {
                setOpenAlbumDialog(true);
                setSelectMode(false);
            }}
        />)
    
    const DeletePhotosButton = () => (
        <ActionButton
            label="Delete"
            icon={<DeleteRounded />}
            onClick={() => {
                deleteSelectedPhotos();
                setSelectMode(false);
            }}
        />)
    
    const SelectPhotosButton = () => (
        <ActionButton
            label={ isSelectMode ? "Cancel" : "Select"}
            icon={<SelectAllRounded />}
            onClick={() => setSelectMode(m => !m)}
        />)
    
    const UploadPhotosButton = () => (
        <ActionButton 
            label="Upload" 
            icon={<UploadIcon />} 
            component='label' 
            sx={{ width: 'fit-content' }}
        >
            <div style={{ display: 'none' }}>
                <FileBase64 multiple={true} onDone={uploadPhotos} />
            </div>
        </ActionButton>)


    return (<>
        <AlbumDialog
            createAlbum={createAlbum}
            open={openAlbumDialog}
            onClose={() => setOpenAlbumDialog(false)}
        />
        <Box sx={{ position: "relative" }}>
            <PhotosList photos={photos} isSelectMode={isSelectMode} />
            <ActionButtonStack>
                {isSelectMode && (
                    <>
                        <NewAlbumButton/>
                        <DeletePhotosButton/>
                    </>
                )}
                <SelectPhotosButton/>
                <UploadPhotosButton/>
            </ActionButtonStack>
        </Box>
        </>);
};



const mapStateToProps = (state) => {
    return {
        photos: state.photos.all,
    };
};

const mapDispatchToProps = (dispatch) => ({
    createAlbum: (albumName) => {
        dispatch(createAlbum(albumName));
        dispatch(clearPhotoSelection);
    },
    deleteSelectedPhotos: () => dispatch(deleteSelectedPhotos()),
    uploadPhotos: photos => dispatch(uploadPhotos(photos))
});

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
