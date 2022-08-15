import PhotoList from "./components/PhotoList";
import { useFirestore } from "react-redux-firebase";
import { useState, useEffect } from "react";
import 'firebase/compat/firestore';

function App() {
    const [ allPhotos, setAllPhotos ] = useState([]);

    const firestore = useFirestore();
    useEffect(() => {
        firestore.collection("photos")
        .onSnapshot(snap => setAllPhotos(snap.docs))
    }, [firestore]);

    return (
        <div className="App">
            <PhotoList photos={allPhotos}/>
        </div>
    );
};

export default App;
