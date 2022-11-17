import { Timestamp } from 'firebase/firestore';
export class Photo {
  id!: string;
  url!: string;
  name!: string;
  tags!: string[];
  createdAt!: String | Timestamp ;
}

export type PhotosMap = {[key: string]: Photo};
