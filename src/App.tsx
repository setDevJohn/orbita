import { HomeProvider } from '@context/Home';
import { ThemeStyleProvider } from '@context/Theme';
import { AppRoutes } from 'router';
import { GlobalStyle } from 'styles/globalStyles';

export function App () {
  return (
    <ThemeStyleProvider>
      <HomeProvider>
        <AppRoutes />
        <GlobalStyle />
      </HomeProvider>
    </ThemeStyleProvider>
  );
}