
export const fetchAlbums = () => {
    return (dispatch, getState, { getFirestore }) => {
        getFirestore()
        .collection('albums')
        .orderBy('name', 'asc')
        .onSnapshot(snap => {
            const albums = snap.docs
                .map(doc => ({ ...doc.data(), id: doc.id }));
            dispatch({ type: 'UPDATE_ALBUMS', payload: albums });
        })
    }
}

export const createAlbum = (albumName) => {
    return (dispatch, getState, { getFirestore }) => {
        const photoIds = getState().photos.selected;
        getFirestore()
        .collection('albums')
        .add({
            name: albumName,
            photoIds
        })

        dispatch({
            type: "CREATE_ALBUM",
            payload: {
                albumName,
                photoIds
            }
        })
    }
}