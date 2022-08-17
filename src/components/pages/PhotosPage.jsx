import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import "firebase/compat/firestore";

import PhotosList from "../photos/PhotoList";
import UploadImages from "../UploadImages";

import { Box, Fab, Stack } from "@mui/material";

const actionButtton = {
    position: 'fixed', 
    bottom: 16, 
    right: 16 
}

const PhotosPage = ({ photos }) => {
    return (
        <Box sx={{ position: "relative" }}>
            <PhotosList photos={photos} />
            <Stack direction='column' spacing={3} sx={actionButtton}>
                <UploadImages/>
                <Fab variant="extended" size="large" color="primary">
                    New album
                </Fab>

            </Stack>
        </Box>
    );
};

export default compose(
    connect(state => ({ photos: state.firestore.ordered.photos })),
    firestoreConnect([{ collection: 'photos', orderBy: ['createdAt', 'desc'] }]),
)(PhotosPage);
