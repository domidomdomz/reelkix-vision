import { Router } from 'express';
import { VisionController } from '../controllers/VisionController';
import { VisionService } from '../../application/services/VisionService';
import { TogetherClient } from '../../infrastructure/together/TogetherClient';
import { config } from '../../config/config';

const router = Router();

// Instantiate dependencies (this is manual DI, following SOLID principles)
const togetherClient = new TogetherClient(config.togetherApiKey);
const visionService = new VisionService(togetherClient);
const visionController = new VisionController(visionService);

// Define route for analyzing image
router.post('/analyze', visionController.analyze);

export default router;
