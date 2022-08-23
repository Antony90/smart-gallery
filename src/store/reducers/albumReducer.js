const initialState = [];

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_ALBUMS":
            console.log(`Updated ${action.payload.length} albums`);
            return action.payload;
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