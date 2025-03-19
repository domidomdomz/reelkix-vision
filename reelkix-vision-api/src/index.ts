// src/index.ts
import express from 'express';
import visionRoutes from './presentation/routes/visionRoutes';
import { config } from './config/config';

const app = express();
const port = config.port;

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
