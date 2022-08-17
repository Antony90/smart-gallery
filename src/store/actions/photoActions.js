import { toast } from 'react-toastify';
import getPredictions from '../../classify/getPredictions'

export const uploadPhotos = (photos) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const db = getFirestore();
        const storageRef = getFirebase().storage().ref();
        
        const numFiles = photos.length;
        const urls = [];
        const imgB64array = photos.map(f => f.base64);
        
        // keep a reference for upload and prediction toasts
        const predToast = toast.loading(`Classifying ${numFiles} photo` + (numFiles === 1 ? "" : "s"));
        const uploadToast = null;
        

        // Update prediction - array of image tags
        // with image indexes corresponding to `files` 
        getPredictions(imgB64array)
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

            photos.forEach((file, idx) => {
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
        }).catch(err => {
            console.log(err);
            const msg = (err.response && err.response.data) || err.message;
            toast.update(predToast, { 
                type: 'error', 
                render: `Error: ${msg}`, 
                isLoading: false, 
                autoClose: 3000 
            });
        });
        dispatch({
            type: 'UPLOAD_PHOTOS',
            payload: photos
        })
    }
};

export const deletePhoto = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const db = getFirestore();
        const storageRef = getFirebase().storage().ref();

        db.collection('photos').doc(id).delete();
        storageRef.child(id).delete();
        
        toast.success(`Deleted photo ${id}.`);
        dispatch({
            type: "DELETE_PHOTO",
            payload: id
        })
    }
}

export const deletePhotoTag = (id, tag) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const db = getFirestore();
        db.collection('photos').doc(id).update({
            tags: getFirebase().firestore.FieldValue.arrayRemove(tag)
        });

        dispatch({
            type: "DELETE_PHOTO_TAG",
            payload: tag
        });
    }
}

export const addPhotoTag = (id, tag) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const db = getFirestore();
        db.collection('photos').doc(id).update({
            tags: getFirebase().firestore.FieldValue.arrayUnion(tag)
        });

        dispatch({
            type: "ADD_PHOTO_TAG",
            payload: tag
        });
    }
}