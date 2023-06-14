'use client';

import { ThemeProvider } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function Providers({ children }: ThemeProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
