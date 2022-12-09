import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

import { getPeople, predictPhotoTags, processFaces } from "./process";
import { collection, db, storage } from "../firebase";
import { Id, toast } from "react-toastify";
import { Photo, PhotosMap } from "../models/Photo";
import { CollectionReference, doc, DocumentSnapshot, getDoc, getDocs, query, QueryDocumentSnapshot, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";

export interface FileInfo {
  name: string;
  base64: string;
  type: string;
  width: number;
  height: number;
}

const photosRef = collection<Photo>(db, 'photos');

const docToPhoto = (doc: DocumentSnapshot<Photo>) => {
  const photo = doc.data();
  if (photo === undefined) {
    throw Error(`Could not get photo document data: ${doc}`);
  }
  if (photo.createdAt instanceof Timestamp) {
    photo.createdAt = photo.createdAt.toString();
  }
  return photo;
}

export const getPhotos = async (userID: string) => {
  const q = query(photosRef);//, where("userID", "==", userID)); 
  const photos: PhotosMap = {};
  (await getDocs(q)).forEach((doc) => {
    photos[doc.id] = docToPhoto(doc);
  })
  return photos;
}

const uploadPhotos = async (files: FileInfo[], photosTags: string[][], photosRef: CollectionReference<Photo>) => {
  const newPhotosMap: PhotosMap = {}; // Store new, uploaded photos
  
  await Promise.all(files.map(async (file, idx) => {
    const photoRef = doc(photosRef);
    // Create a reference for the photo, using its
    // firestore  photo ID as its name
    const photoStorageRef = ref(storage, photoRef.id);
    const src = await uploadString(photoStorageRef, file.base64, 'data_url')
      .then(() => getDownloadURL(photoStorageRef));
    const photoDoc = {
      name: file.name,
      width: file.width,
      height: file.height,
      tags: photosTags[idx],
      createdAt: serverTimestamp(),
      src,
    };
    console.log(photoDoc);
    await setDoc(photoRef, photoDoc);
    await updateDoc(photoRef, { src });

    const photo = docToPhoto(await getDoc(photoRef));
    newPhotosMap[photoRef.id] = photo;
  }));

  return newPhotosMap;
}

export interface HandleUploadReturnType {
  newPhotos: PhotosMap;
  facePhotoIDs: string[];
  facePhotosBase64: string[];
}
export const handleUpload = async (photos: FileInfo[], userID: string) => {
  // First add file object to firestore to generate its unique ID
  // Then upload file to storage, with name as ID
  // Get storage URL, update firestore object with URL
  // This means all files in storage have unique names
  const photosRef = collection<Photo>(db, 'photos');

  // Make tag predictions for each photo
  const base64Photos = photos.map((f) => f.base64);
  const photoResults = await predictPhotoTags(base64Photos);
  // Array of tags for all photos
  const tags = photoResults.map(result => result.tags);

  // Upload to firebase
  const newPhotos = await uploadPhotos(photos, tags, photosRef);
  
  // Filter ids of photos which contain faces
  const facePhotoIDs = Object.keys(newPhotos).filter((_, idx) => photoResults[idx].has_face);
  const facePhotosBase64 = photos
    .filter((_, idx) => photoResults[idx].has_face)
    .map(file => file.base64);
  return { newPhotos, facePhotoIDs, facePhotosBase64 } as HandleUploadReturnType;
};
