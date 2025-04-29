import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import AdminReminders from "./components/AdminReminders/AdminReminders";
import AdminSlides from "./components/AdminSlides/AdminSlides";
import Navbar from "./components/Navbar/Navbar";
import TvView from "./components/TvView/TvView";
import AutoLogin from "./configuration/AutoLogin";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const TOKEN_STORAGE_KEY = import.meta.env.VITE_JWT_TOKEN

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));
  const location = useLocation();

  const isJwtExpired = (token: string | null) => {
    if (!token) return true;
    try {
      console.log("Token", token)
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp ? decoded.exp < currentTime : true;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    if(!localStorage.getItem("preLoginPath")) {
      localStorage.setItem("preLoginPath", window.location.pathname)
    }

    if (window.location.search.includes("code=")) {
    
      if (!sessionStorage.getItem("oauthProcessed")) {
        window.history.replaceState({}, document.title, window.location.pathname);
        sessionStorage.setItem("oauthProcessed", "true");
      }
    }
  
    const currentToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  
    if (currentToken && !isJwtExpired(currentToken)) {
      setToken(currentToken);
    } else {
      setToken(null);
    }
  }, []);
  

  const theme = createTheme({
    palette: {
      primary: { main: "#d90429" },
      secondary: { main: "#000000" },
      background: { default: "#FFFFFF" },
      text: { primary: "#000000", secondary: "#000000" },
    },
  });

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {token ? (
            <Routes>
              <Route path="/reminders" element={
                <Box className="outer-content-container">
                  <Navbar />
                  <Container maxWidth={false} className="content-container">
                    <AdminReminders />
                  </Container>
                </Box>
              } />
              <Route path="/slides" element={
                <Box className="outer-content-container">
                  <Navbar />
                  <Container maxWidth={false} className="content-container">
                    <AdminSlides />
                  </Container>
                </Box>
              } />
              <Route path="/" element={<TvView />} />
            </Routes>
        
        ) : (
          <AutoLogin isTvView={localStorage.getItem("preLoginPath") === '/'} initialPath={window.location.href} />
        )}
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;