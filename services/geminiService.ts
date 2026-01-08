
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnnotationDetail, AnnotationNode } from "../types";

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("[GeminiService] CRÍTICO: Chave de API não encontrada em process.env.API_KEY ou GEMINI_API_KEY");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });
const MODEL_NAME = "gemini-3-flash-preview";

export async function fetchAnnotationDetails(name: string): Promise<AIAnnotationDetail> {
  console.log(`[GeminiService] Buscando detalhes para: ${name}`);
  const prompt = `Forneça informações técnicas detalhadas sobre o seguinte conceito, tecnologia ou anotação: "${name}".
  Responda obrigatoriamente em PORTUGUÊS (Brasil).
  
  Para o campo "codeExample", forneça um exemplo prático de código (Java, Bash, Dockerfile, etc, dependendo do contexto), com quebras de linha (\\n) e indentação correta, SEM usar blocos de markdown.
  
  Inclua um resumo (summary), um caso de uso específico (useCase), o código de exemplo (codeExample) e 3 dicas de especialista (tips).`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
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

    const result = JSON.parse(response.text.trim());
    console.log(`[GeminiService] Detalhes para ${name} obtidos com sucesso`);
    return result;
  } catch (error) {
    console.error(`[GeminiService] Erro ao buscar detalhes para ${name}:`, error);
    throw error;
  }
}

export async function generateMindMap(topic: string): Promise<AnnotationNode> {
  console.log(`[GeminiService] Gerando mapa mental para: ${topic}`);

  const prompt = `Gere uma estrutura de mapa mental em formato JSON para a tecnologia ou conceito: "${topic}".
  Responda obrigatoriamente em PORTUGUÊS (Brasil).
  
  REGRAS CRÍTICAS:
  1. O nó raiz (root) deve ser "${topic}".
  2. Crie de 3 a 5 categorias principais DIFERENTES (ex: Arquitetura, Instalação, Comandos, Segurança, etc).
  3. Para cada categoria, crie de 2 a 4 sub-itens (folhas) com nomes específicos e técnicos.
  4. NÃO REPITA nomes de categorias ou itens.
  5. Use cores hexadecimais variadas e vibrantes (Tailwind colors).
  
  A estrutura deve ser:
  {
    "name": "${topic}",
    "type": "root",
    "color": "#HEX",
    "children": [
      {
        "name": "Nome da Categoria",
        "type": "category",
        "color": "#HEX",
        "children": [
          { "name": "Item Específico", "type": "annotation", "color": "#HEX" }
        ]
      }
    ]
  }`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            type: { type: Type.STRING },
            color: { type: Type.STRING },
            children: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  type: { type: Type.STRING },
                  color: { type: Type.STRING },
                  children: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        type: { type: Type.STRING },
                        color: { type: Type.STRING }
                      },
                      required: ["name", "type", "color"]
                    }
                  }
                },
                required: ["name", "type", "color"]
              }
            }
          },
          required: ["name", "type", "color", "children"]
        }
      }
    });

    const text = response.text.trim();
    console.log("[GeminiService] Resposta bruta recebida:", text);

    const parsed = JSON.parse(text);
    console.log("[GeminiService] JSON parseado com sucesso");
    return parsed;
  } catch (error) {
    console.error("[GeminiService] Erro ao gerar ou parsear mapa mental:", error);
    throw error;
  }
}
