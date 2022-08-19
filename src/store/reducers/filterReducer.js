const initialState = '';

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_FILTER":
            console.log(`Filter changed ${action.payload}`);
            return action.payload;
        default:
            return state;
    }
};

export default filterReducer;