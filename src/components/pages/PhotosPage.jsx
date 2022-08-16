import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import "firebase/compat/firestore";

import PhotosList from "../photos/PhotoList";
import UploadImages from "../UploadImages";

import { Box } from "@mui/material";

const PhotosPage = ({ photos }) => {
    return (
        <Box sx={{ position: "relative" }}>
            <PhotosList photos={photos} />
            <UploadImages style={{ position: 'fixed', bottom: 16, right: 16 }}/>
        </Box>
    );
};

export default compose(
    connect(state => ({ photos: state.firestore.ordered.photos })),
    firestoreConnect(['photos']),
)(PhotosPage);
