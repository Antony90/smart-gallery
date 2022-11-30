import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

import { getPeople, predictPhotoTags, processFaces } from "./process";
import { collection, db, storage } from "../firebase";
import { Id, toast } from "react-toastify";
import { Photo } from "../models/Photo";
import { CollectionReference, doc, serverTimestamp, updateDoc } from "firebase/firestore";

interface FileInfo {
  name: string;
  base64: string;
  type: string;
}

const uploadPhotos = async (photos: FileInfo[], photosTags: string[][], photosRef: CollectionReference<Photo>, uploadToast: Id | null) => {
  var numUploaded = 0;
  return await Promise.all(photos.map(async (file, idx) => {
    const photo = {
      name: file.name,
      tags: photosTags[idx],
      createdAt: serverTimestamp(),
      albums: [],
    };
    console.log("photo", photo);
    console.log("Adding photo", photo);
    const photoDoc = doc(photosRef);
    if (uploadToast === null) {
      uploadToast = toast("Uploading files", { progress: 0 });
    }
    // Create a reference for the photo, using its
    // firestore  photo ID as its name

    const photoStorageRef = ref(storage, photoDoc.id);
    const url = await uploadString(photoStorageRef, file.base64, 'base64')
      .then(() => getDownloadURL(photoStorageRef));

    // Update toast progress
    numUploaded++;
    const progress = numUploaded / photos.length;
    if (progress === 1) {
      toast.update(uploadToast, {
        type: "success",
        render: "Uploaded files",
        autoClose: 3000,
        progress,
      });
    }
    else {
      toast.update(uploadToast, { progress });
    }
    // Update firestore url for photo
    await updateDoc(photoDoc, { url });
    console.log(photoDoc);
    return photoDoc.id;
  }
  ))
}

export const handleUpload = async (photos: FileInfo[], userID: string) => {
  // keep a reference for upload and prediction toasts
  const predToast = toast.loading(
    `Classifying ${photos.length} photo` + (photos.length === 1 ? "" : "s")
  );
  var uploadToast: Id | null = null;

  const base64Photos = photos.map((f) => f.base64);
  console.log(base64Photos);
  const photoResults = await predictPhotoTags(base64Photos)
    .catch((err) => {
      const msg = (err.response && err.response.data) || err.message;
      toast.update(predToast, {
        type: "error",
        render: `Error: ${msg}`,
        isLoading: false,
        autoClose: 3000,
      });
      return null;
    });
  if (photoResults == null) return;

  toast.update(predToast, {
    type: "success",
    render: `Classified ${photos.length} photo` + (photos.length === 1 ? "" : "s"),
    isLoading: false,
    autoClose: 3000,
  });

  // First add file object to firestore to generate its unique ID
  // Then upload file to storage, with name as ID
  // Get storage URL, update firestore object with URL
  // This means all files in storage have unique names
  const photosRef = collection<Photo>(db, 'photos');
  console.log("A");
  // Array of tags for all photos
  const tags = photoResults.map(result => result.tags);
  const photoIDs = await uploadPhotos(photos, tags, photosRef, uploadToast);
  console.log(photoIDs);

  // Filter photos without any faces
  const facePhotoIDs = photoIDs.filter((_, idx) => photoResults[idx].has_face);
  await processFaces(userID, base64Photos, facePhotoIDs);

  const people = await getPeople(userID);
  console.log(people);
};
