import React from 'react';
import { Fab } from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';
import FileBase64 from "react-file-base64";

import { useFirestore, useFirebase } from "react-redux-firebase";
import 'firebase/compat/storage';
import getPredictions from "../classify/getPredictions";

import { toast } from 'react-toastify';

const UploadImages = ({ style }) => {
    const db = useFirestore();
    const storageRef = useFirebase().storage().ref();
    
    // to update their progress and status
    const uploadToast = React.useRef(null);
    
    // Recieves an array of files
    // Uploads file to storage, creates a document in firestore
    // returns array of URLs in order
    const uploadFiles = async (files) => {
        const numFiles = files.length;
        const urls = [];
        
        // keep a reference for upload and prediction toasts
        const predToast = toast.loading(`Classifying ${numFiles} photo` + (numFiles === 1 ? "" : "s"));
        
        const imgB64array = files.map(f => f.base64);

        // Update prediction - array of image tags
        // with image indexes corresponding to `files` 
        getPredictions(imgB64array, predToast)
        .then(async (predictions) => {
            toast.update(predToast, { 
                type: 'success', 
                render: `Classified ${numFiles} photo` + (numFiles === 1 ? "" : "s"), 
                isLoading: false, 
                autoClose: 3000 
            });

            // First add file object to firestore to generate its unique ID
            // Then upload file to storage, with name as ID
            // Get storage URL, update firestore object with URL
            // This means all files in storage have unique names                         
            const photosCollection = db.collection('photos');

            var numUploaded = 0;

            files.forEach((file, idx) => {
                const photo = {
                    name: file.name,
                    tags: predictions[idx],
                    createdAt: db.FieldValue.serverTimestamp()
                }
                photosCollection.add(photo).then(
                    async ref => {
                        
                        // Create a reference for the photo, using its 
                        // firestore  photo ID as its name
                        const photoRef = storageRef.child(ref.id);
                        
                        await photoRef.putString(file.base64, 'data_url', {contentType: file.type})
                        .then(snap => snap.ref.getDownloadURL())
                        .then(downloadURL => {
                            // Update toast progress
                            numUploaded++;
                            const progress = numUploaded / numFiles;
                            if (uploadToast.current === null) {
                                uploadToast.current = toast('Uploading files', { progress, autoClose: false });
                            } else {
                                toast.update(uploadToast.current, { progress })
                            }

                            // Update firestore url for photo 
                            ref.update({ url: downloadURL });
                            urls.push(downloadURL);
                        })
                    }
                );
            });
            toast.update(uploadToast.current, { type: toast.TYPE.SUCCESS, autoClose: 3000 });
            // TODO create Alert and Dialogue for error vvv
        });
        // Reset reference
        uploadToast.current = null;
    }

    return (
        <Fab variant="extended" size="large" color="secondary" component='label' sx={style}>
            <div style={{ display: 'none' }}>
                <FileBase64 multiple={true} onDone={uploadFiles} />
            </div>
            <UploadIcon />
        </Fab>
    );
}

export default UploadImages;