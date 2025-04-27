import { ThemeStyleProvider } from '@context/Theme';
import { AppRoutes } from 'router';
import { GlobalStyle } from 'styles/globalStyles';

export function App () {
  return (
    <ThemeStyleProvider>
      <AppRoutes />
      <GlobalStyle />
    </ThemeStyleProvider>
  );
}