import { ai } from '../genkit';
import { z } from 'zod';

export const translateFlow = ai.defineFlow(
  {
    name: 'translateFlow',
    inputSchema: z.object({
      text: z.string(),
      sourceLang: z.string(),
      targetLang: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({ text, sourceLang, targetLang }) => {
    const model = 'googleai/gemini-2.5-flash';
    const llm = ai.getModel(model);

    const languageMap: Record<string, string> = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      it: 'Italian',
      ja: 'Japanese',
      ko: 'Korean',
      pt: 'Portuguese',
      ru: 'Russian',
      zh: 'Chinese (Simplified)',
      ar: 'Arabic',
      hi: 'Hindi',
    };

    const sourceLanguage = languageMap[sourceLang] || sourceLang;
    const targetLanguage = languageMap[targetLang] || targetLang;

    const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Do not add any extra commentary or analysis, just the translated text.\n\nText: "${text}"`;

    const { text: translatedText } = await llm.generate({
      prompt,
    });
    
    return translatedText;
  }
);
