import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// All styles from platform-ui (fonts, CSS, tokens)
import '@xala-technologies/platform-ui/styles';
import { DesignsystemetProvider } from '@xala-technologies/platform-ui';
import App from './App';

// Theme context for sharing theme state
type ColorScheme = 'light' | 'dark';
interface ThemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  colorScheme: 'light',
  setColorScheme: () => { },
  toggleTheme: () => { },
});

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    // Check stored preference or system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as ColorScheme | null;
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Apply to document for CSS custom properties
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    localStorage.setItem('theme', colorScheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, toggleTheme }}>
      <DesignsystemetProvider theme="custom" colorScheme={colorScheme} size="md">
        {children}
      </DesignsystemetProvider>
    </ThemeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
