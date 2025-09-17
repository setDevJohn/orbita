import { createContext, ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export interface ITheme {
  type: string
  contrastColor: string
  textColor: string
  secondaryColor: string
  linearGradient: string
  mainBackground: string
  lightBackground: string
  darkBackground: string
  borderColor: string
  primaryFont: string
  bigTitle: string
  title: string,
  subtitle: string,
  bigText: string,
  normalText: string,
  smallText: string,
  normalSpan: string,
  smallSpan: string
}

const commonAttr = {
  primaryFont: '"Inter", sans-serif',
  bigTitle: '28px',
  title: '24px',
  subtitle: '21px',
  bigText: '18px',
  normalText: '16px',
  smallText: '14px',
  normalSpan: '13px',
  smallSpan: '12px',
};

const themeColor = {
  dark : {
    type: 'dark',
    contrastColor: '#6366F1',
    textColor: '#F5F5F5',
    secondaryColor: '#94a3b8',
    linearGradient: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
    mainBackground: '#161B22 ',
    lightBackground: '#1F242C',
    darkBackground: '#0D1117',
    borderColor: '#334155',
    ...commonAttr
  },
  light: {
    type: 'light',
    contrastColor: '#3b82f6',
    textColor: '#1F2937',
    secondaryColor: '#6B7280',
    linearGradient: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    mainBackground: '#FAFAFA',
    lightBackground: '#EAEAEA',
    darkBackground: '#E5E7EB',
    borderColor: '#D1D5DB',
    ...commonAttr
  },
};

const ThemeContext = createContext<{
  theme: ITheme;
  handleChangeTheme: () => void
    }>({
      theme: themeColor.dark,
      handleChangeTheme: () => {}
    });

type ThemeProviderProps = { children: ReactNode }

const ThemeStyleProvider = ({ children } : ThemeProviderProps) => {
  const [theme, setTheme] = useState<ITheme>(themeColor.dark);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    
    if (savedTheme) {
      setTheme(themeColor[savedTheme]);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? themeColor.dark : themeColor.light);
    }
  }, []);

  const handleChangeTheme = () => {
    const newTheme = theme === themeColor.dark ? 'light' : 'dark';
    setTheme(themeColor[newTheme]);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeStyleProvider };