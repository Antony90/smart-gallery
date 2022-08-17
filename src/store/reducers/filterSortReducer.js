const initialState = {
    filter: '',
    sort: 'createdAt',
    order: 'desc'
};

const filterSortReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SORT":
            console.log(`Changed sort ${action.payload}`);
            return { ...state, ...action.payload };
        case "UPDATE_FILTER":
            console.log(`Filter changed ${action.payload}`);
            return { ...state, filter: action.payload };
        default:
            return state;
    }
};

export default filterSortReducer;