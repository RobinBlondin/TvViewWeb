import "./App.css";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import HeaderSidebar from "./components/HeaderSidebar/HeaderSidebar";
import SlideAdmin from "./components/SlideAdmin/SlideAdmin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AutoLogin from "./configuration/AutoLogin";
import { useEffect, useState } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const TOKEN_STORAGE_KEY = import.meta.env.VITE_GOOGLE_ID_TOKEN_STORAGE_KEY;

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));

  useEffect(() => {
    const checkToken = () => {
      const newToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (newToken !== token) {
        setToken(newToken);
      }
    };

    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [token]);

  useEffect(() => {
    const newToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (newToken && newToken !== token) {
      setToken(newToken);
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: { main: "#6b9080" },
      secondary: { main: "#a4c3b2" },
      background: { default: "#eaf4f4" },
      text: { primary: "#6b9080", secondary: "#a4c3b2" },
    },
  });

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {
        token ? 
          <Container>
            <HeaderSidebar />
            <Container className="content-container">
              <SlideAdmin />
            </Container>
          </Container>
         : 
          <Container>
            <AutoLogin />
          </Container>
        }
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
