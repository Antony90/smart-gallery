const signIn = (user) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        // No need to check if user already signed up
        // Doc data can be overwritten on sign in
        const users = getFirestore().collection('users');
        const userDoc = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        };

        const userId = user.uid;
        
        users.doc(userId).set(userDoc)
        .then(() => {
            dispatch({ 
                type: 'SIGN_IN', 
                payload: { id: userId, ...userDoc } 
            })
        })
        .catch(console.log);

    }
}

const deleteUser = (userId) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        getFirestore()
        .collection('users')
        .delete(userId);
    }
}

const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        getFirebase().auth().signOut().then(() => {
            dispatch({
                type: 'SIGN_OUT'
            });
          }).catch((error) => {
            console.log("Could not sign out user", error, getState());
          });
    }
}


export { signIn, deleteUser, signOut };