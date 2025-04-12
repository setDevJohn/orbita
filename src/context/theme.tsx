import { createContext, ReactNode, useState } from 'react';
import { ThemeProvider } from 'styled-components';

interface ITheme {
  contrastColor: string
  textColor: string
  color1: string
  color2: string
  color3: string
  primaryFont: string
  secondaryFont: string
}

const themeColor = {
  dark : {
    contrastColor: '#2AD883',
    textColor: '#FFFFFF',
    color1: '#1d1d1e',
    color2: '#252526',
    color3: '#404047',
    color4: '#535358',
    primaryFont: '"Inter", sans-serif',
    secondaryFont: '"Poppins", sans-serif',
  },
  light: {
    contrastColor: '#0073E6',
    textColor: '#1A1A1A',
    color1: '#E0E0E0',
    color2: '#CFCFCF',
    color3: '#CFCFCF',
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