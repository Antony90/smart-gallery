const initialState = {};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_ALBUM":
            console.log(`Created album ${action.payload}`);
            return state;
        case "DELETE_ALBUM":
            console.log(`Deleted album ${action.payload}`);
            return state;
        case "ADD_PHOTOS_TO_ALBUM":
            console.log(`Added photos to album ${action.payload}`);
            return state;
        case "DELETE_PHOTOS_FROM_ALBUM":
            console.log(`Deleted photos from album ${action.payload}`);
            return state;
        default:
            return state;
    }
};

export default albumReducer;