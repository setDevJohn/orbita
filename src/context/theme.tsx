import { createContext, ReactNode, useState } from 'react';
import { ThemeProvider } from 'styled-components';

interface ITheme {
  contrastColor: string
  textColor: string
  primaryColor: string
  secondaryColor: string
  tertiaryColor: string
  primaryFont: string
  secondaryFont: string
}

const themeColor = {
  dark : {
    contrastColor: '#2AD883',
    textColor: '#FFFFFF',
    primaryColor: '#1d1d1e',
    secondaryColor: '#252526',
    tertiaryColor: '#404047',
    primaryFont: '"Poppins", serif',
    secondaryFont:  '"DM Mono", serif',
  },
  light: {
    contrastColor: '#0073E6',
    textColor: '#1A1A1A',
    primaryColor: '#E0E0E0',
    secondaryColor: '#CFCFCF',
    tertiaryColor: '#CFCFCF',
    primaryFont: '"Poppins", serif',
    secondaryFont:  '"DM Mono", serif',
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

const ThemeColorProvider = ({ children } : ThemeProviderProps) => {

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

export { ThemeContext, ThemeColorProvider };