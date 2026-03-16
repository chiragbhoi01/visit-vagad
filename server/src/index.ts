import express from 'express';
import { config } from './config/config.ts';
import connectDB from './db/connectDatabase.ts';

const app = express();
const PORT = config.port || 3000;

// Essential middleware
app.use(express.json());       // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded

app.get('/home', (req, res) => {
  console.log("Welcome to Visit Vagad"); 
  res.send("Welcome to Visit Vagad");  
});

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
