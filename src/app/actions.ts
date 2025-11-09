'use server';

import { translateFlow } from '@/ai/flows/translate';
import { z } from 'zod';

const translateSchema = z.object({
  sourceText: z.string().min(1, 'Please enter text to translate.'),
  sourceLang: z.string(),
  targetLang: z.string(),
});

type TranslationState = {
  message: string;
  translatedText: string | null;
  errors?: {
    sourceText?: string[];
    sourceLang?: string[];
    targetLang?: string[];
  } | null;
};

export async function getTranslation(
  prevState: TranslationState,
  formData: FormData
): Promise<TranslationState> {
  const validatedFields = translateSchema.safeParse({
    sourceText: formData.get('sourceText'),
    sourceLang: formData.get('sourceLang'),
    targetLang: formData.get('targetLang'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      translatedText: null,
    };
  }

  const { sourceText, sourceLang, targetLang } = validatedFields.data;

  if (sourceLang === targetLang) {
    return {
      message: 'Source and target languages are the same.',
      translatedText: sourceText,
      errors: null,
    };
  }

  try {
    const translatedText = await translateFlow({
      text: sourceText,
      sourceLang,
      targetLang,
    });

    return {
      message: 'Translation successful.',
      translatedText,
      errors: null,
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      message: 'Translation failed. Please try again later.',
      translatedText: null,
      errors: null,
    };
  }
}
