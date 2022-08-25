const initialState = {
    all: [],
    selected: [],
    unsub: null
};

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PHOTO_UNSUB":
            console.log("Set photo unsub");
            return { ...state, unsub: action.payload }
        case "UPDATE_PHOTOS":
            console.log(`Updated ${action.payload.length} photos`);
            return {...state,  all: action.payload };
        case "DELETE_PHOTO":
            // TODO remove photo from selection when deleted
            console.log(`Deleted photo ${action.payload}`);
            return state;
        case "SELECT_PHOTO":
            const { id } = action.payload;
            console.log(`Selected photo ${id}`);
            // If not already selected, add to array
            // Otherwise remove from array
            const newSelected = !state.selected.find(ph => ph.id === id) ? 
            [...state.selected, action.payload] : state.selected.filter(photo => photo.id !== id);
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