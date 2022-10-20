const initialState = {};
/* 
userDoc = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL
};
*/

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_IN":
            console.log(`Signed in: ${JSON.stringify(action.payload)}`);
            return action.payload;
        case "SIGN_OUT":
            console.log("Signing out");
            // Clear user doc
            return initialState;
        default:  
            return state;
    }
};

export default userReducer;