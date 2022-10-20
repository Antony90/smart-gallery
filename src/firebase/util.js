export const getUserCollection = (db, collection, userId) => {
    return db.collection('users').doc(userId).collection(collection)
}