import React, { createContext, useContext, useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
  colors: {
    background: string;
    card: string;
    text: string;
    mutedText: string;
    border: string;
    primary: string;
    danger: string;
  };
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  const colors = useMemo(() => {
    if (mode === 'dark') {
      return {
        background: '#0d0c18',
        card: '#151515',
        text: '#FCFCF5',
        mutedText: '#b5b5b5',
        border: '#2a2a2a',
        primary: '#6a62be',
        danger: '#ff5a5a',
      };
    }
    return {
      background: '#FCFCF5',
      card: '#f5f5f5',
      text: '#0d0c18',
      mutedText: '#555555',
      border: '#dddddd',
      primary: '#6a62be',
      danger: '#d11a2a',
    };
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
