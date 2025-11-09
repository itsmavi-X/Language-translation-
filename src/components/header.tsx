import { Languages } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Languages className="h-6 w-6 text-primary-foreground/80" />
          <span className="font-headline text-lg font-semibold text-foreground">
            LinguaLens
          </span>
        </Link>
      </div>
    </header>
  );
}
