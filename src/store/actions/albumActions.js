export const fetchAlbums = (setUnsubscribe) => {
    return (dispatch, getState, { getFirestore }) => {
        const unsub = 
        getFirestore()
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
        setUnsubscribe(unsub)
    }
}

export const createAlbum = (albumName) => {
    return (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const photoIds = getState().photos.selected.map(ph => ph.id)

        db.collection('albums')
        .add({
            name: albumName
        })
        .then(doc => {
            const albumId = doc.id;

            // Add albumId to albums field for each photo
            photoIds.forEach(photoId => {
                db.collection('photos')
                .doc(photoId)
                .update({
                    albums: db.FieldValue.arrayUnion(albumId)
                })
            })
        })
    }
}