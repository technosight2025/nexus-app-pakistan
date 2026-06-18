"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextProps {
  isRomanUrdu: boolean;
  setIsRomanUrdu: (val: boolean) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isRomanUrdu, setIsRomanUrduState] = useState<boolean>(false);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('isRomanUrdu');
    if (saved) {
      setIsRomanUrduState(saved === 'true');
    }
  }, []);

  const setIsRomanUrdu = (val: boolean) => {
    setIsRomanUrduState(val);
    localStorage.setItem('isRomanUrdu', String(val));
  };

  return (
    <LanguageContext.Provider value={{ isRomanUrdu, setIsRomanUrdu }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
