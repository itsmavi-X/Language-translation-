'use client';

import {
  useState,
  useEffect,
  useActionState,
} from 'react';
import { getTranslation } from '@/app/actions';
import { languages, type Language } from '@/lib/languages';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRightLeft, Copy, Volume2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const initialState = {
  message: '',
  translatedText: '',
  errors: null,
};

export function TranslationTool() {
  const [state, formAction, isPending] = useActionState(
    getTranslation,
    initialState
  );
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [sourceText, setSourceText] = useState('');
  const { toast } = useToast();

  const handleSwapLanguages = () => {
    const newSourceLang = targetLang;
    const newTargetLang = sourceLang;
    setSourceLang(newSourceLang);
    setTargetLang(newTargetLang);
    if (state.translatedText) {
      setSourceText(state.translatedText);
    }
  };

  const handleCopy = async () => {
    if (!state.translatedText) return;
    try {
      await navigator.clipboard.writeText(state.translatedText);
      toast({
        title: 'Copied to clipboard!',
        description: 'The translated text has been copied.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Copy failed',
        description: 'Could not copy text to clipboard.',
      });
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && state.translatedText) {
      const utterance = new SpeechSynthesisUtterance(state.translatedText);
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((v) => v.lang.startsWith(targetLang));
      if (voice) {
        utterance.voice = voice;
      }
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        variant: 'destructive',
        title: 'Unsupported',
        description: 'Text-to-speech is not supported in your browser.',
      });
    }
  };

  useEffect(() => {
    if (state.message && state.message !== 'Translation successful.' && !state.translatedText) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-3xl shadow-2xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl tracking-tight sm:text-3xl">
          LinguaLens
        </CardTitle>
        <CardDescription>
          Instant language translation at your fingertips.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="relative">
            <Textarea
              name="sourceText"
              placeholder="Enter text to translate..."
              className="min-h-[150px] resize-none pr-12 text-sm"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <Select
              name="sourceLang"
              value={sourceLang}
              onValueChange={setSourceLang}
            >
              <SelectTrigger className="w-full sm:w-auto flex-1">
                <SelectValue placeholder="Source Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang: Language) => (
                  <SelectItem key={`source-${lang.value}`} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={handleSwapLanguages}
              aria-label="Swap languages"
              className="group"
            >
              <ArrowRightLeft className="h-5 w-5 text-muted-foreground transition-transform group-hover:rotate-180" />
            </Button>

            <Select
              name="targetLang"
              value={targetLang}
              onValueChange={setTargetLang}
            >
              <SelectTrigger className="w-full sm:w-auto flex-1">
                <SelectValue placeholder="Target Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang: Language) => (
                  <SelectItem key={`target-${lang.value}`} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full text-sm font-semibold" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : null}
            Translate
          </Button>
        </form>

        <div
          className={cn(
            'transition-all duration-500 ease-in-out',
            state.translatedText ? 'opacity-100 max-h-screen mt-6' : 'opacity-0 max-h-0'
          )}
        >
          <Separator className="my-6" />
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold font-headline">Translation</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleSpeak} aria-label="Speak translated text">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy translated text">
                  <Copy className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>
            <Card className="bg-accent/50 border-dashed">
              <CardContent className="p-4">
                <p className="text-sm text-foreground/90 min-h-[150px]">
                  {state.translatedText}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
