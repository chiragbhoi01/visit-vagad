import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
}

export interface IPlace extends Document {
    name: string;
    district: "Banswara" | "Dungarpur";
    category: "temple" | "nature" | "tribal" | "waterfall" | "historical" | "spiritual";
    images: string[];
    bestSeason?: "Summer" | "Monsoon" | "Winter";
    coordinates: {
        latitude: number;
        longitude: number;
    };
}
