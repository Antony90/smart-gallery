import axios from "axios";
import { People } from "../models/Person";
axios.defaults.baseURL = 'http://127.0.0.1:8000';

type PersonData = {
    name: string;
    id: string;
    image_ids: string[];
}

export const getPeople = async (userID: string) => {
    const { data } = await axios.get<PersonData[]>(`/faces/${userID}/`);
    const people: People = {};
    data.forEach(({ id, name, image_ids }) => {
        people[id] = { id, name, photoIDs: image_ids };
    })
    return people;
}

export const renamePerson = async (userID: string, personID: string, name: string) => {
    await axios.patch(`/faces/${userID}/${personID}/rename`);
}

export const deleteFace = async (userID: string, photoID: string) => {
    const { data } = await axios.delete<string[]>(`/faces/${userID}/${photoID}/`);
    return data;
}

export const processFaces = async (userID: string, base64Photos: string[], photoIDs: string[]) => {
    // Zip base64 images with their image IDs
    const photoData = base64Photos.map((photo, idx) => {
        return { data: photo, id: photoIDs[idx] };
    })
    await axios.post(`/faces/${userID}/process`, photoData);
}
export type PhotoResult = {
    tags: string[];
    has_face: boolean;
}
export const predictPhotoTags = async (images: string[]) => {
    const { data } = await axios.post<PhotoResult[]>("/classify", images);
    return data;
}