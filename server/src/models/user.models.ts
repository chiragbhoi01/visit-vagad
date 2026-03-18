import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "../types/index.ts";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps: true
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}


export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
