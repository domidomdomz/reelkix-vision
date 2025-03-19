import { Request, Response } from 'express';
import { VisionService } from '../../application/services/VisionService';

export class VisionController {
    private visionService: VisionService;

    constructor(visionService: VisionService) {
        this.visionService = visionService;
    }

    public analyze = async (req: Request, res: Response): Promise<void> => {
        try {
            const { imageUrl } = req.body;
            if (!imageUrl) {
                res.status(400).json({ error: 'Missing imageUrl in request body.' });
                return;
            }

            const shoeDetails = await this.visionService.getShoeDetails(imageUrl);
            res.json(shoeDetails);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };
}
