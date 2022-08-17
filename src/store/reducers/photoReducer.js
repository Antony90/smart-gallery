const initialState = {};

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPLOAD_PHOTOS":
            console.log(`Uploaded photos ${action.payload}`);
            return state;
        case "DELETE_PHOTO":
            console.log(`Deleted photo ${action.payload}`);
            return state;
        case "ADDED_PHOTO_TAG":
            console.log(`Added tag to photo ${action.payload}`);
            return state;
        case "REMOVE_PHOTO_TAG":
            console.log(`Removed tag from photo ${action.payload}`);
            return state;
        default:  
            return state;
    }
};

export default photoReducer;