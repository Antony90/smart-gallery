import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import "firebase/compat/firestore";

import PhotosList from "../photos/PhotoList";
import UploadImages from "../UploadImages";

import {
    Box,

    Fab,
    Stack,

} from "@mui/material";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { createAlbum } from "../../store/actions/albumActions";
import {
    clearPhotoSelection,
    deleteSelectedPhotos,
} from "../../store/actions/photoActions";
import { DeleteRounded, SelectAllRounded } from "@mui/icons-material";
import AlbumDialog from "./AlbumDialog";

const actionButtton = {
    position: "fixed",
    bottom: 16,
    right: 16,
};

const ActionButtonStack = (props) => (
    <Stack direction="column" spacing={3} sx={actionButtton} alignItems="end">
        {props.children}
    </Stack>
);
const ActionButton = ({ onClick, label, icon }) => (
    <Fab variant="extended" size="large" color="primary" onClick={onClick}>
        <div style={{ marginRight: "10px", display: "inline-flex" }}>
            {icon}
        </div>
        {label}
    </Fab>
);



const PhotosPage = ({ photos, createAlbum, deleteSelectedPhotos }) => {
    const [isSelectMode, setSelectMode] = useState(false);
    const [openAlbumDialog, setOpenAlbumDialog] = useState(false);

    return (<>
        <AlbumDialog
            createAlbum={createAlbum}
            open={openAlbumDialog}
            onClose={() => setOpenAlbumDialog(false)}
        />
        <Box sx={{ position: "relative" }}>
            <PhotosList photos={photos} isSelectMode={isSelectMode} />
            <ActionButtonStack>
                {isSelectMode ? (
                    <>
                        <ActionButton
                            label="New album"
                            icon={<DeleteRounded />}
                            onClick={() => {
                                setOpenAlbumDialog(true);
                                setSelectMode(false);
                            }}
                        />

                        <ActionButton
                            label="Delete"
                            icon={<DeleteRounded />}
                            onClick={() => {
                                deleteSelectedPhotos();
                                setSelectMode(false);
                            }}
                        />
                    </>
                ) : (
                    <ActionButton
                        label="Select"
                        icon={<SelectAllRounded />}
                        onClick={() => setSelectMode(true)}
                    />
                )}
                <UploadImages />
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
