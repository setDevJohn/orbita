import { ThemeColorProvider } from "context/theme";
import { AppRoutes } from "router";
import { GlobalStyle } from "styles/globalStyles";

export function App () {
  return (
    <ThemeColorProvider>
      <AppRoutes />
      <GlobalStyle />
    </ThemeColorProvider>
  );
}