import { toast } from 'react-toastify';
import getPredictions from '../../classify/getPredictions'

export const uploadPhotos = (photos) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const db = getFirestore();
        const storageRef = getFirebase().storage().ref();
        
        const numFiles = photos.length;
        const imgB64array = photos.map(f => f.base64);
        
        // keep a reference for upload and prediction toasts
        const predToast = toast.loading(`Classifying ${numFiles} photo` + (numFiles === 1 ? "" : "s"));
        var uploadToast = null;
        
        // Update prediction - array of image tags
        // with image indexes corresponding to `files` 
        await getPredictions(imgB64array)
        .then(predictions => {
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
                photosCollection.add(photo).then(async ref => {
                    if (uploadToast === null)
                        uploadToast = toast('Uploading files', { progress: 0 });
                    // Create a reference for the photo, using its 
                    // firestore  photo ID as its name
                    const photoRef = storageRef.child(ref.id);
                    
                    await photoRef.putString(file.base64, 'data_url', { contentType: file.type })
                    .then(snap => snap.ref.getDownloadURL())
                    .then(url => {
                        // Update toast progress
                        numUploaded++;
                        const progress = numUploaded / numFiles;
                        if (progress === 1) 
                            toast.update(uploadToast, { 
                                type: 'success', 
                                render: 'Uploaded files', 
                                autoClose: 3000,
                                progress
                            })
                        else toast.update(uploadToast, { progress })
                        
                        // Update firestore url for photo 
                        ref.update({ url});
                    })
                });
            });
        }).catch(err => {
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
}


export const deletePhoto = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        
        getFirestore()
            .collection('photos')
            .doc(id)
            .delete();
        
        getFirebase()
            .storage()
            .ref()
            .child(id)
            .delete();
        
        toast.info(`Deleted photo ${id}`);
        dispatch({
            type: "DELETE_PHOTO",
            payload: id
        })
    }
}


export const deletePhotoTag = (id, tag) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        getFirestore()
        .collection('photos')
        .doc(id)
        .update({
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