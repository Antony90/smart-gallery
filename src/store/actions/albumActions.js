
export const fetchAlbums = () => {
    return (dispatch, getState, { getFirestore }) => {
        const getPhotoFromId = async (id) => (
            await getFirestore()
            .collection('photos')
            .doc(id)
            .get()
            .then(doc => { 
                return (!doc.exists) ? null :  { id, ...doc.data() } 
            })
        )

        getFirestore()
        .collection('albums')
        .orderBy('name', 'asc')
        .onSnapshot(async snap => {
            const albums = 
            await Promise.all(snap.docs.map(async (doc) => {
                const photoIds = doc.data().photoIds;
                const fetchedPhotos = await Promise.all(photoIds.map(id => getPhotoFromId(id)));
                // An album can point to photo IDs which no longer exist in firestore
                // These can be removed from the photoIds array
                const validPhotos = fetchedPhotos.filter(ph => ph) // Valid photos are not null
                console.log("validPhotos:", validPhotos, "fetchedPhotos:", fetchedPhotos)
                // FIXME should I use await
                doc.ref.update({
                    // Update using set intersection
                    photoIds: photoIds.filter(id => validPhotos.find(ph => ph.id === id))
                })
                
                return {
                    id: doc.id,
                    name: doc.data().name,
                    photos: validPhotos
                }
            }))
            dispatch({ type: 'UPDATE_ALBUMS', payload: albums })
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