import { ThemeProvider } from "@mui/material";
import AuthProvider from "./Providers/AuthProvider";
import LoaderProvider from "./Providers/LoaderProvider";
import TempAuthProvider from "./Providers/TemporaryAuthProvider";
import AppRoutes from "./Routes/Router";
import theme from "./Theme";

function App() {
  return (
    <LoaderProvider>
      <AuthProvider>
        <TempAuthProvider>
          <ThemeProvider theme={theme}>
            <AppRoutes />
          </ThemeProvider>
        </TempAuthProvider>
      </AuthProvider>
    </LoaderProvider>
  );
}

export default App;
