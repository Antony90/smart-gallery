const initialState = {
    all: [],
    selected: []
};

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_PHOTOS":
            console.log(`Updated ${action.type.length} photos`);
            return {...state,  all: action.payload };
        case "DELETE_PHOTO":
            // TODO remove photo from selection when deleted
            console.log(`Deleted photo ${action.payload}`);
            return state;
        case "SELECT_PHOTO":
            const id = action.payload;
            console.log(`Selected photo ${id}`);
            // If not already selected, add to array
            // Otherwise remove from array
            const newSelected = state.selected.indexOf(id) === -1 ? 
            [...state.selected, id] : state.selected.filter(photoId => photoId !== id);
            return { ...state, selected: newSelected }
        case "CLEAR_SELECTED_PHOTOS":
            console.log("Cleared photo selection");
            return { ...state, selected: [] }
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