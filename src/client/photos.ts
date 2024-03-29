import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

import { getPeople, predictPhotoTags, processFaces } from "./process";
import { collection, db, storage } from "../firebase";
import { Id, toast } from "react-toastify";
import { Photo, PhotosMap } from "../models/Photo";
import { CollectionReference, deleteDoc, doc, DocumentSnapshot, getDoc, getDocs, query, QueryDocumentSnapshot, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";

export type FileInfo = {
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

const uploadPhotos = async (files: FileInfo[], photosTags: string[][]) => {
  const newPhotosMap: PhotosMap = {}; // Store new, uploaded photos
  const loadingToast = toast.loading(`Uploading ${files.length} photo` + (files.length === 1 ? "" : "s"), { progress: 0 });

  try {
    await Promise.all(files.map(async (file, idx) => {
      const photoRef = doc(photosRef);
      // Create a reference for the photo, using its
      // firestore  photo ID as its name
      const photoStorageRef = ref(storage, photoRef.id);

      // Upload base64 image and get URL for client
      const src = await uploadString(photoStorageRef, file.base64, 'data_url')
        .then(() => getDownloadURL(photoStorageRef));

      // Create doc and add to firebase database
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

      const photo = docToPhoto(await getDoc(photoRef));
      newPhotosMap[photoRef.id] = photo;
      toast.update(loadingToast, { progress: (idx+1)/ files.length });
    }))
  } catch (err) {
    toast.update(loadingToast, { type: 'error', render: "Upload error " + err });
    return newPhotosMap;
  }
  toast.update(loadingToast, { type: 'success', render: `Uploaded ${files.length} photo` + (files.length === 1 ? "" : "s"), isLoading: false });
  return newPhotosMap;
}

export interface HandleUploadReturnType {
  newPhotos: PhotosMap;
  facePhotoIDs: string[];
  facePhotosBase64: string[];
}

/**
 * @param photos HTML File objects for upload images
 * @param userID Client's user id
 * @returns new Photo objects, array of photo IDs with faces, base64 of photos with faces
 */
export const handleUpload = async (photos: FileInfo[], userID: string) => {
  // First add file object to firestore to generate its unique ID
  // Then upload file to storage, with name as ID
  // Get storage URL, update firestore object with URL
  // This means all files in storage have unique names
  const photosRef = collection<Photo>(db, 'photos');

  // Make tag predictions for each photo
  const base64Photos = photos.map((f) => f.base64);
  // TODO: return face bounding boxes
  const photoResults = await predictPhotoTags(base64Photos);

  // Array of tags for all photos
  const tags = photoResults.map(result => result.tags);

  // Upload to firebase
  const newPhotos = await uploadPhotos(photos, tags);
  
  // Filter ids of photos which contain faces
  const facePhotoIDs = Object.keys(newPhotos).filter((_, idx) => photoResults[idx].has_face);
  const facePhotosBase64 = photos
    .filter((_, idx) => photoResults[idx].has_face)
    .map(file => file.base64);
  return { newPhotos, facePhotoIDs, facePhotosBase64 } as HandleUploadReturnType;
};

export const deletePhoto = async (id: string, userID: string) => {
  await deleteDoc(doc(photosRef, id));
}
