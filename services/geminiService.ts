
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnnotationDetail, AnnotationNode } from "../types";

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("[GeminiService] CRÍTICO: Chave de API não encontrada em process.env.API_KEY ou GEMINI_API_KEY");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });
const MODEL_NAME = "gemini-3-flash-preview";

const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/ignore\s+previous\s+instructions/gi, '')
    .replace(/system\s*:/gi, '')
    .trim()
    .substring(0, 200);
};

export async function fetchAnnotationDetails(name: string): Promise<AIAnnotationDetail> {
  const sanitizedName = sanitizeInput(name);

  if (process.env.NODE_ENV === 'development') {
    console.log(`[GeminiService] Buscando detalhes para: ${sanitizedName}`);
  }

  const prompt = `Forneça informações técnicas detalhadas sobre o seguinte conceito, tecnologia ou anotação: "${sanitizedName}".
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

    if (!result.summary || !result.useCase || !result.codeExample || !Array.isArray(result.tips)) {
      throw new Error('Resposta da API em formato inválido');
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[GeminiService] Detalhes para ${sanitizedName} obtidos com sucesso`);
    }

    return result;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[GeminiService] Erro ao buscar detalhes:`, error);
    }
    throw new Error('Falha ao buscar detalhes. Por favor, tente novamente.');
  }
}

export async function generateMindMap(topic: string): Promise<AnnotationNode> {
  const sanitizedTopic = sanitizeInput(topic);

  if (process.env.NODE_ENV === 'development') {
    console.log(`[GeminiService] Gerando mapa mental para: ${sanitizedTopic}`);
  }

  const prompt = `Gere uma estrutura de mapa mental em formato JSON para a tecnologia ou conceito: "${sanitizedTopic}".
  Responda obrigatoriamente em PORTUGUÊS (Brasil).
  
  REGRAS CRÍTICAS:
  1. O nó raiz (root) deve ser "${sanitizedTopic}".
  2. Crie no MÍNIMO 4 categorias principais e no MÁXIMO 8 categorias (ex: Arquitetura, Core, Web, Segurança, Banco de Dados, Testes, Nuvem, etc).
  3. Para cada categoria, crie de 3 a 6 sub-itens (folhas) com nomes técnicos e específicos.
  4. NÃO REPITA nomes de categorias ou itens.
  5. Use cores hexadecimais variadas, vibrantes e contrastantes (Tailwind colors like emerald, sky, amber, rose, violet).
  6. Se o tópico for complexo, sinta-se à vontade para expandir para mais de 4 categorias.`;

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

    if (process.env.NODE_ENV === 'development') {
      console.log("[GeminiService] Resposta recebida");
    }

    const parsed = JSON.parse(text);

    if (!parsed.name || !parsed.type || !parsed.color || !Array.isArray(parsed.children)) {
      throw new Error('Resposta da API em formato inválido');
    }

    if (process.env.NODE_ENV === 'development') {
      console.log("[GeminiService] JSON parseado com sucesso");
    }

    return parsed;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("[GeminiService] Erro ao gerar mapa mental:", error);
    }
    throw new Error('Falha ao gerar mapa mental. Por favor, tente novamente.');
  }
}
