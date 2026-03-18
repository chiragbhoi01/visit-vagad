import express from 'express';
import { config } from './config/config.ts';
import connectDB from './db/connectDatabase.ts';
import authRouter from "./routes/auth.routes"
import placeRouter from "./routes/place.routes.ts"


const app = express();
const PORT = config.port || 3000;

// Essential middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter)
app.use("/api/places", placeRouter)

// Await DB connection before listen
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
