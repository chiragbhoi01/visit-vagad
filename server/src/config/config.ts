import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI as String,
    jwtSecret: process.env.JWT_SECRET as String,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN as String,
};

