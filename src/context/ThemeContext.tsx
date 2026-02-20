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
        background: '#0b0b0b',
        card: '#151515',
        text: '#ffffff',
        mutedText: '#b5b5b5',
        border: '#2a2a2a',
        primary: '#4ea1ff',
        danger: '#ff5a5a',
      };
    }
    return {
      background: '#ffffff',
      card: '#f5f5f5',
      text: '#111111',
      mutedText: '#555555',
      border: '#dddddd',
      primary: '#1b74ff',
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
