import { GoogleGenAI } from "@google/genai";
import { Goal, Habit } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const commonErrorHandler = (error: any) => {
    console.error("Error calling Gemini API:", error);
    return "Desculpe, não consegui processar sua solicitação no momento. Por favor, tente novamente mais tarde.";
}

export async function getAISuggestion(goals: Goal[], habits: Habit[]): Promise<string> {
  const goalDescriptions = goals.map(g => `- ${g.title} (Progresso: ${g.progress}%, Prioridade: ${g.priority ? 'Alta' : 'Normal'})`).join('\n');
  const habitDescriptions = habits.map(h => `- ${h.name}`).join('\n');

  const prompt = `
    Você é um coach de produtividade IA, amigável e motivacional. Sua tarefa é fornecer uma sugestão curta e encorajamento para o usuário com base em suas metas e hábitos atuais. Responda em Português do Brasil.

    Metas Atuais:
    ${goalDescriptions}

    Hábitos Atuais:
    ${habitDescriptions}

    Analise os dados e forneça uma sugestão curta (2-3 frases), motivacional e acionável. Foque em uma coisa: pode ser um elogio pela consistência, uma dica para uma meta com baixo progresso ou um lembrete gentil. Mantenha o tom positivo e de apoio.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    return commonErrorHandler(error);
  }
}

export async function getAIGoalIdeas(goals: Goal[], habits: Habit[]): Promise<string> {
  const goalInterests = goals.map(g => g.category).join(', ');
  const habitInterests = habits.map(h => h.name).join(', ');

  const prompt = `
    Você é um assistente criativo de IA especializado em desenvolvimento pessoal. Sua tarefa é sugerir 3 novas metas inspiradoras para um usuário. Responda em Português do Brasil.

    Interesses do usuário (baseado em metas e hábitos atuais):
    - Categorias de Metas: ${goalInterests}
    - Hábitos: ${habitInterests}

    Com base nesses interesses, sugira 3 novas metas que sejam interessantes e desafiadoras, mas alcançáveis. Para cada meta, forneça um título e uma breve descrição (1 frase). Formate a saída como uma lista com marcadores. Seja criativo!
  `;
    
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    return commonErrorHandler(error);
  }
}