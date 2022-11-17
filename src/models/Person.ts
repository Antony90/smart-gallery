export type Person = {
    id: string; 
    name: string;
    faceIDs: string[];
}

// Person ID to photo IDs where photo contains person's Face
export type People = {[key: string]: Person};