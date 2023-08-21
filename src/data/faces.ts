import { People, Person } from "../models/Person"
import { photos, photosArr } from "./photos"


const musk: Person = {
    id: "1234",
    name: "Elon Musk",
    photoIDs: Object.entries(photos).filter(([_, p]) => p.name.toLowerCase().includes("musk")).map(([id, p]) => id)
} 

const rock: Person = {
    id: "4321",
    name: "Dwayne \"The Rock\" Johnson",
    photoIDs: Object.entries(photos).filter(([_, p]) => p.name.toLowerCase().includes("rock")).map(([id, p]) => id)
} 

const keanu: Person = {
    id: "2112",
    name: "Keanu Reeves",
    photoIDs: Object.entries(photos).filter(([_, p]) => p.name.toLowerCase().includes("keanu")).map(([id, p]) => id)
} 
const mark: Person = {
    id: "2112",
    name: "Mark Zuckerberg",
    photoIDs: Object.entries(photos).filter(([_, p]) => p.name.toLowerCase().includes("mark")).map(([id, p]) => id)
} 
const jim: Person = {
    id: "2112",
    name: "Jim Carrey",
    photoIDs: Object.entries(photos).filter(([_, p]) => p.name.toLowerCase().includes("jim")).map(([id, p]) => id)
} 

export const faces = {
    "11": rock,
    "1": musk,
    "1111a": mark,
    "111": keanu,
    "1111": jim,
} as People;

