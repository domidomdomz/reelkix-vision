import { Together } from 'together-ai';
import { config } from '../../config/config';

export interface TogetherResponse {
    // Adjust these properties based on the actual response structure from Together AI.
    brand?: string;
    model?: string;
    colorway?: string;
    sku?: string;
    text?: string;
}

export class TogetherClient {
    private client: Together;

    constructor(apiKey: string) {
        this.client = new Together({ apiKey });
    }

    public async analyzeImage(imageUrl: string, prompt: string): Promise<TogetherResponse> {
        // Creating messages object; type assertion as 'any' is used here to bypass type issues.
        const messages = [
            {
                role: 'user',
                content: [
                    { type: 'text', text: prompt },
                    {
                        type: 'image_url',
                        image_url: { url: imageUrl },
                    },
                ],
            },
        ] as any;

        const response = await this.client.chat.completions.create({
            model: config.model,
            temperature: 0.2,
            stream: false,
            max_tokens: 500,
            messages,
        });

        //console.log(response);

        // Use a type assertion to access properties that may not be declared in the TS definition.
        const outputText = ((response as any).choices?.[0]?.message?.content || '');

        console.log(outputText);

        try {
            return JSON.parse(outputText);
        } catch (error) {
            //throw new Error(`Failed to parse Together AI response: ${outputText}`);
            return {
                brand: '',
                model: '',
                colorway: '',
                sku: '',
                text: outputText,
            };
        }

        //return outputText;
    }
}
