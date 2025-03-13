import "./App.css";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AutoLogin from "./configuration/AutoLogin";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AdminReminders from "./components/AdminReminders/AdminReminders";
import SlideAdmin from "./components/SlideAdmin/SlideAdmin";

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
      return true;
    }
  };

  useEffect(() => {
    const newToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!newToken || isJwtExpired(newToken)) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
      setToken(null); 
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
      primary: { main: "#d90429" },
      secondary: { main: "#000000" },
      background: { default: "#FFFFFF" },
      text: { primary: "#000000", secondary: "#000000" },

    },
  });

  console.log(token)

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {token ? (
          <Box className="outer-content-container">
            <SlideAdmin />
          </Box>
        ) : (
          <AutoLogin />
        )}
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
