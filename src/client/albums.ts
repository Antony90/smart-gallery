import { Album } from "../models/Album";


export const getAlbums = async (userID: string) => {
  return [] as Album[];
}

export const createAlbum = async (photoIDs: string[], name: string, userID: string) => {
  // Create album doc
  // Create reference to album for each photo
  return {} as Album;
}

export const deleteAlbum = async (albumID: string, userID: string) => {
  // Delete album doc
  // Delete reference to album for each photoID
}

export const addPhotosToAlbum = async (album: Album, photoIDs: string[], userID: string) => {
  // Update album doc
  // Create reference to album for each photo
  // Handle photo already in album
  return {} as Album;
}

export const removePhotosFromAlbum = async (album: Album, photoIDs: string[], userID: string) => {
  // Update album photoIDs
  // Remvoe reference to album for each photo
  // No need to handle photo not in album
  return {} as Album;
}