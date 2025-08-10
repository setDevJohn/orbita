import { AuthProvider } from '@context/Auth';
import { HomeProvider } from '@context/Home';
import { ThemeStyleProvider } from '@context/Theme';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from 'router';
import { GlobalStyle } from 'styles/globalStyles';

export function App () {
  return (
    <ThemeStyleProvider>
      <AuthProvider>
        <HomeProvider>
          <ToastContainer/>
          <AppRoutes />
          <GlobalStyle />
        </HomeProvider>
      </AuthProvider>
    </ThemeStyleProvider>
  );
}