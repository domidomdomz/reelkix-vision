import { ShoeDetails } from '../../domain/models/ShoeDetails';
import { TogetherClient } from '../../infrastructure/together/TogetherClient';

export class VisionService {
    private togetherClient: TogetherClient;
    private prompt: string =
        `
        If your confidence is 90% or above, format your answer as valid JSON with keys "brand", "model", "colorway", "sku", "confidence" and "text".

        Identify the following details from the shoe in the image:
        - Brand
        - Model name
        - Colorway Alias
        - SKU
        - Your confidence percentage in the accuracy of the details
        - Other shoe details in text format

        If the image is not a shoe, tell the user what is in his image and to provide a shoe image.
        `;

    constructor(togetherClient: TogetherClient) {
        this.togetherClient = togetherClient;
    }

    public async getShoeDetails(imageUrl: string): Promise<ShoeDetails> {
        const result = await this.togetherClient.analyzeImage(imageUrl, this.prompt);
        // Validate and transform result if necessary, ensuring SOLID principles by isolating business logic here.
        return {
            brand: result.brand || '',
            model: result.model || '',
            colorway: result.colorway || '',
            sku: result.sku || '',
            confidence: result.confidence || 0,
            text: result.text || ''
        };
    }
}
