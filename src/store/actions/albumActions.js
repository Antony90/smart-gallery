export const fetchAlbums = () => {
    return (dispatch, getState, { getFirestore }) => {
        getFirestore()
        .collection('albums')
        .orderBy('name', 'asc')
        .onSnapshot(snap => {
            const albums = snap.docs.map(doc => ({
                id: doc.id, 
                name: doc.data().name,
            }))
            dispatch({ type: 'UPDATE_ALBUMS', payload: albums })
        })
    }
}

export const createAlbum = (albumName) => {
    return (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();
        const photoIds = getState().photos.selected;

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

            dispatch({
                type: "CREATE_ALBUM",
                payload: {
                    name: albumName,
                    photoIds: photoIds 
                }
            })

        })

    }
}