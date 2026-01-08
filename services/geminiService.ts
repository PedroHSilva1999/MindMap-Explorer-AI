
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnnotationDetail } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fetchAnnotationDetails(name: string): Promise<AIAnnotationDetail> {
  const prompt = `Forneça informações técnicas detalhadas sobre o seguinte conceito ou anotação do Spring Framework: ${name}.
  Responda obrigatoriamente em PORTUGUÊS (Brasil).
  
  Para o campo "codeExample", forneça APENAS o código Java puro, com quebras de linha (\\n) e indentação correta, SEM usar blocos de markdown (sem \`\`\`java).
  
  Inclua um resumo (summary), um caso de uso específico (useCase), o código Java (codeExample) e 3 dicas de especialista (tips).`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          useCase: { type: Type.STRING },
          codeExample: { type: Type.STRING },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["summary", "useCase", "codeExample", "tips"]
      }
    }
  });

  return JSON.parse(response.text.trim());
}
