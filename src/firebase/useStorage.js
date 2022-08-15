import { useFirebase } from 'react-redux-firebase';
import 'firebase/compat/storage';

const useStorage = () => {
    const firebase = useFirebase();

    const uploadFiles = async (files) => {
        const urls = [];
        const storageRef = firebase.storage().ref();
        
        for (const file of files) {
            const imageRef = storageRef.child(file.name);
            
            // For each file, start an upload, updating the total bytes and progress variables
            await imageRef.putString(file.base64, 'data_url', {contentType: 'image/jpeg'})
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(downloadURL => urls.push(downloadURL));

            console.log("DONE");
            
            // // Add url to urls array
            // const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
            // urls.push(downloadUrl);
        };
        
        return urls;
    };

    return { uploadFiles };
};

export default useStorage;

// const uploadFiles = async (files, storage) => {
//     const urls = [];

//     const storageRef = storage.ref();
//     for (const file of files) {
        
//         const imageRef = storageRef.child(file.name);
        
//         // For each file, start an upload, updating the total bytes and progress variables
//         const uploadTask = imageRef.putString(file.base64, 'data_url', {contentType: 'image/jpeg'});
        
//         const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
//         urls.push(downloadUrl);
            
//     }

//     return urls;
// };

// export default uploadFiles;