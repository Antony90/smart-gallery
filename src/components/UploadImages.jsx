import { Fab } from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';
import FileBase64 from "react-file-base64";

import { useFirestore } from "react-redux-firebase";
import 'firebase/compat/storage';
import useStorage from "../firebase/useStorage";

import getPredictions from "../classify/getPredictions";

const UploadImages = ({ sx }) => {
    const { uploadFiles } = useStorage();
    const db = useFirestore();

    // Recieves an array of files
    const onSelectFiles = async (files) => {
        const imgB64arrays = files.map(f => f.base64);
        // Update prediction - array of image tags
        // with image indexes corresponding to `files` 
        getPredictions(imgB64arrays)
        .then(async (predictions) => {

            // Triggers useStorage to upload files to firebase/storage
            // Updates urls - array of image urls with indexes corresponding to `files`
            const urls = await uploadFiles(files);
            
            const photosCollection = db.collection('photos');
            files.forEach((file, idx) => {
                const photo = {
                    name: file.name,
                    tags: predictions[idx],
                    url: urls[idx]
                }
                photosCollection.add(photo);
            });
            // TODO create Alert
        })
        .catch(err => {
            console.log(err);
            // TODO create Dialogue
        });
    }

    return (
        <Fab variant="extended" size="large" color="secondary" component='label' sx={sx}>
            <div style={{ display: 'none' }}>
                <FileBase64 multiple={true} onDone={onSelectFiles} />
            </div>
            <UploadIcon />
        </Fab>
    );
}

export default UploadImages;