import { Box, Container } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminMobileComponent from "./components/AdminMobileComponent/AdminMobileComponent";
import AdminMobileSlidesComponent from "./components/AdminMobileSlidesComponent/AdminMobileSlidesComponent";
import AdminReminders from "./components/AdminReminders/AdminReminders";
import AdminSlides from "./components/AdminSlides/AdminSlides";
import Navbar from "./components/Navbar/Navbar";
import TvView from "./components/TvView/TvView";
import AutoLogin from "./configuration/AutoLogin";
import { getWindowWidth } from "./utils/utils";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const TOKEN_STORAGE_KEY = import.meta.env.VITE_JWT_TOKEN;

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_STORAGE_KEY)
  );

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
    if (!localStorage.getItem("preLoginPath")) {
      localStorage.setItem("preLoginPath", window.location.pathname);
    }

    const currentToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (currentToken && !isJwtExpired(currentToken)) {
      setToken(currentToken);
    } else {
      setToken(null);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {token ? (
        <Routes>
          <Route
            path="/reminders"
            element={
              <Box className="outer-content-container">
                {getWindowWidth() > 768 && <Navbar />}
                <Container maxWidth={false} className="content-container">
                  <AdminReminders />
                </Container>
              </Box>
            }
          />
          <Route
            path="/slides"
            element={
              <Box className="outer-content-container">
                {getWindowWidth() > 768 && <Navbar />}
                <Container maxWidth={false} className="content-container">
                  {getWindowWidth() > 768 ? (
                    <AdminSlides />
                  ) : (
                    <AdminMobileSlidesComponent />
                  )}
                </Container>
              </Box>
            }
          />
          <Route
            path="/"
            element={
              getWindowWidth() > 768 ? <TvView /> : <AdminMobileComponent />
            }
          />
        </Routes>
      ) : (
        <AutoLogin
          isTvView={localStorage.getItem("preLoginPath") === "/"}
          initialPath={window.location.href}
        />
      )}
    </GoogleOAuthProvider>
  );
}

export default App;
