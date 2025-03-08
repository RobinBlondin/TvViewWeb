import "./App.css";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import HeaderSidebar from "./components/HeaderSidebar/HeaderSidebar";
import SlideAdmin from "./components/SlideAdmin/SlideAdmin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AutoLogin from "./configuration/AutoLogin";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SlideCard from "./components/SlideAdmin/SlideCard";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const TOKEN_STORAGE_KEY = import.meta.env.VITE_GOOGLE_ID_TOKEN_STORAGE_KEY;
const ACCESS_TOKEN_STORAGE_KEY = import.meta.env.VITE_GOOGLE_ACCESS_TOKEN_STORAGE_KEY;

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));

  const isJwtExpired = (token: string | null) => {
    if (!token) return true;
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp ? decoded.exp < currentTime : true;
    } catch (error) {
      return true; // Invalid token
    }
  };

  useEffect(() => {
    const newToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!newToken || isJwtExpired(newToken)) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
      setToken(null); // This will trigger AutoLogin
    } else if (newToken !== token) {
      setToken(newToken);
    }
  }, [token]);

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
        {token ? (
          <Container>
            <HeaderSidebar />
            <Container className="content-container">
              <SlideCard   
                url={"https://picsum.photos/200"}
                id={"1"}
              ></SlideCard>
            </Container>
          </Container>
        ) : (
          <AutoLogin /> // Triggers auto-login when token is null
        )}
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
