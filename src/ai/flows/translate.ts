import { ai } from '../genkit';
import { z } from 'zod';

// A map for more realistic-looking mock translations
const mockTranslations: Record<string, Record<string, string>> = {
  en: {
    es: 'Esto es una traducción simulada de inglés a español.',
    fr: 'Ceci est une traduction simulée de l\'anglais vers le français.',
    de: 'Dies ist eine simulierte Übersetzung von Englisch nach Deutsch.',
  },
  es: {
    en: 'This is a simulated translation from Spanish to English.',
  },
  fr: {
    en: 'This is a simulated translation from French to English.',
  },
  de: {
    en: 'This is a simulated translation from German to English.',
  },
};

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
    // In a real app, this would use a tool to call a translation service.
    // We simulate the API call and response.
    console.log(`Simulating translation for "${text}" from ${sourceLang} to ${targetLang}`);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay

    const mock = mockTranslations[sourceLang]?.[targetLang];
    if (mock) {
      return `${mock} (Original: "${text}")`;
    }

    // Fallback for unmapped language pairs
    return `This is a mock translation of "${text}" from ${sourceLang} to ${targetLang}.`;
  }
);
