import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'neon' | 'classic' | 'minimal';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('neon');

  useEffect(() => {
    const savedTheme = localStorage.getItem('tic-tac-toe-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tic-tac-toe-theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ['neon', 'classic', 'minimal'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}