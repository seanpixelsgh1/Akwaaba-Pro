import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "./types";

export const identifyProduct = async (base64Image: string, productList: Product[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const context = productList.map(p => `ID: ${p.id}, Name: ${p.name}`).join('\n');
  const prompt = `Identify which product from the list matches the image. List: \n${context}\n Return ONLY JSON: {"productId": "ID", "confidence": 0.9}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] || base64Image } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: { productId: { type: Type.STRING }, confidence: { type: Type.NUMBER } },
          required: ['productId', 'confidence']
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return null;
  }
};
