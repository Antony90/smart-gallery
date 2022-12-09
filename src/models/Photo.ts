import { Timestamp } from 'firebase/firestore';
export type Photo = {
  src: string;
  name: string;
  tags: string[];
  createdAt: string | Timestamp;
  width: number;
  height: number;
}

export type PhotosMap = {[key: string]: Photo};
