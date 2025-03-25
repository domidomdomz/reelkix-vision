// src/index.ts
import express from 'express';
import cors from 'cors';
import visionRoutes from './presentation/routes/visionRoutes';
import { config } from './config/config';

const app = express();
const port = config.port;

// Allow requests from specific origins (local and deployed React app)
const allowedOrigins = [
    'http://localhost:7139', // Local ReelkixVision Web API'
    config.reelkixVisionWebApiUrl // Deployed ReelkixVision Web API
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Optional: if using cookies or other credentials
}));

// Middleware to parse JSON
app.use(express.json());

// Use the vision routes
app.use('/api', visionRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Reelkix Vision API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
