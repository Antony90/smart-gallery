import { toast } from 'react-toastify'; 
import { getUserCollection } from '../../firebase/util';


export const fetchAlbums = () => {
    return (dispatch, getState, { getFirestore }) => {
        const userId = getState().user.id;
        const unsub = 
        getUserCollection(getFirestore(), 'albums', userId)

        .collection('albums')
        .orderBy('name', 'asc')
        .onSnapshot(snap => {
            const albums = snap.docs.map(doc => ({
                id: doc.id, 
                name: doc.data().name,
                photoIds: doc.data().photoIds
            }))
            dispatch({ type: 'UPDATE_ALBUMS', payload: albums })
        })
        dispatch({ type: 'SET_ALBUM_UNSUB', payload: unsub })
    }
}

export const createAlbum = (albumName) => {
    return (dispatch, getState, { getFirestore }) => {
        const photoIds = getState().photos.selected.map(ph => ph.id)
        const userId = getState().user.id;

        const db = getFirestore();
        const albumsCollection = getUserCollection(db, 'albums', userId) ;
        const photosCollection = getUserCollection(db, 'photos', userId) ;

        albumsCollection.add({
            name: albumName
        })
        .then(doc => {
            const albumId = doc.id;

            // Add albumId to albums field for each photo
            photoIds.forEach(photoId => {
                photosCollection
                .doc(photoId)
                .update({
                    albums: db.FieldValue.arrayUnion(albumId)
                })
            })
        })
    }
}

export const deleteAlbum = id => {
    return (dispatch, getState, { getFirestore }) => {
        const userId = getState().user.id;
        getUserCollection(getFirestore(), 'albums', userId)
        .doc(id)
        .delete()
        .then(() => toast.success(`Deleted album ${id}`))
    }
}