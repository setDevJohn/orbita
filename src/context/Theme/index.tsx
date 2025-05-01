import { createContext, ReactNode, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export interface ITheme {
  contrastColor: string
  textColor: string
  color1: string
  color2: string
  color3: string
  color4: string
  primaryFont: string
  secondaryFont: string
  bigTitle: string
  title: string,
  subtitle: string,
  normalText: string,
  smallText: string,
  normalSpan: string,
  smallSpan: string
}

const commonAttr = {
  primaryFont: '"Inter", sans-serif',
  secondaryFont: '"Poppins", sans-serif',
  bigTitle: '28px',
  title: '24px',
  subtitle: '20px',
  normalText: '16px',
  smallText: '14px',
  normalSpan: '13px',
  smallSpan: '12px',
};

const themeColor = {
  dark : {
    contrastColor: '#2AD883',
    textColor: '#cecdcd',
    color1: '#1d1d1e',
    color2: '#252526',
    color3: '#404047',
    color4: '#535358',
    ...commonAttr
  },
  light: {
    contrastColor: '#0073E6',
    textColor: '#1A1A1A',
    color1: '#E0E0E0',
    color2: '#CFCFCF',
    color3: '#CFCFCF',
    color4: '#535358',
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

// Achar novo nome 
const ThemeStyleProvider = ({ children } : ThemeProviderProps) => {

  const [theme, setTheme] = useState<ITheme>(themeColor.dark);

  const handleChangeTheme = () => {
    const currentTheme = theme === themeColor.dark
      ? themeColor.light : themeColor.dark;
    setTheme(currentTheme);
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