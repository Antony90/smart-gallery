const initialState = {
    all: [],
    unsub: null
};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALBUM_UNSUB":
            console.log("Set album unsub");
            return { ...state, unsub: action.payload }
        case "UPDATE_ALBUMS":
            console.log(`Updated ${action.payload.length} albums`);
            return { ...state, all: action.payload };
        case "CREATE_ALBUM":
            console.log(`Created album ${JSON.stringify(action.payload)}`);
            return state;
        case "DELETE_ALBUM":
            console.log(`Deleted album ${action.payload}`);
            return state;
        default:
            return state;
    }
};

export default albumReducer;