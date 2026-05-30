'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Locale } from '@/lib/translations';
import { translations } from '@/lib/translations';

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)['en'];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
