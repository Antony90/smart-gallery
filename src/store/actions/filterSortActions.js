export const setSearchFilter = filterStr => ({
    type: "UPDATE_FILTER",
    payload: filterStr
})

export const setSort = ({ sort, order }) => ({
    type: "SET_SORT",
    payload: { sort, order }
})