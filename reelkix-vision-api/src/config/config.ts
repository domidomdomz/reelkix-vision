import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    togetherApiKey: process.env.TOGETHER_API_KEY || '',
    port: process.env.PORT || 3001,
    model: process.env.MODEL || 'meta-llama/Llama-Vision-Free'
};
