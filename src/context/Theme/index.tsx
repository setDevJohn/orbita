import { createContext, ReactNode, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export interface ITheme {
  contrastColor: string
  textColor: string
  linearGradient: string
  mainBackground: string
  lightBackground: string
  darkBackground: string
  buttonColor: string
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
  subtitle: '20px',
  bigText: '18px',
  normalText: '16px',
  smallText: '14px',
  normalSpan: '13px',
  smallSpan: '12px',
};

const themeColor = {
  dark : {
    contrastColor: '#6366F1',
    textColor: '#cecdcd',
    linearGradient: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
    mainBackground: '#161B22 ',
    lightBackground: '#1F242C',
    darkBackground: '#0D1117',
    buttonColor: '#0C3A46',
    ...commonAttr
  },
  light: {
    contrastColor: '#0073E6',
    textColor: '#1A1A1A',
    linearGradient: '#E0E0E0',
    mainBackground: '#CFCFCF',
    lightBackground: '#CFCFCF',
    darkBackground: '#535358',
    buttonColor: '#CFCFCF',
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

// Old theme:
// dark : {
//   contrastColor: '#1de9b6',
//   textColor: '#cecdcd',
//   linearGradient: 'linear-gradient(35deg, #05050d, #165868)',
//   mainBackground: '#22303c ',
//   lightBackground: '#394b54',
//   darkBackground: '#0A212C',
//   buttonColor: '#0C3A46',
//   ...commonAttr
// },