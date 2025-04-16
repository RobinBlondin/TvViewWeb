import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "./App.css";
import CalendarComponent from "./components/CalendarComponent/CalendarComponent";
import AutoLogin from "./configuration/AutoLogin";
import SlideComponent from "./components/SlideComponent/SlideComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminReminders from "./components/AdminReminders/AdminReminders";
import AdminSlides from "./components/AdminSlides/AdminSlides";
import CommuteComponent from "./components/CommuteComponent/CommuteComponent";
import { DepartureModel } from "./models/DepartureModel";
import { getBusDepartures } from "./service/departureService";
import TvView from "./components/TvView/TvView";
import ReminderComponent from "./components/ReminderComponent/ReminderComponent";
import { HighwayBridgeComponent } from "./components/HighwayBridgeComponent/HighwayBridgeComponent";
import Navbar from "./components/Navbar/Navbar";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const TOKEN_STORAGE_KEY = import.meta.env.VITE_GOOGLE_ID_TOKEN_STORAGE_KEY;
const ACCESS_TOKEN_STORAGE_KEY = import.meta.env.VITE_GOOGLE_ACCESS_TOKEN_STORAGE_KEY;

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));
  const [departures, setDepartures] = useState<DepartureModel[]>([])

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

  useEffect(() => {
    getBusDepartures().then((data) => {
      if (data) setDepartures(data)
    })
  }, [])

  const theme = createTheme({
    palette: {
      primary: { main: "#d90429" },
      secondary: { main: "#000000" },
      background: { default: "#FFFFFF" },
      text: { primary: "#000000", secondary: "#000000" },
    },
  });

  return (
    <BrowserRouter>
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
              <Route path="/reminders-show" element={
                <Box className="outer-content-container">
                  <Container className="content-container">
                    <ReminderComponent />
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
              <Route path="/slides-show" element={
                <Box className="outer-content-container">
                  <Container className="content-container">
                    <SlideComponent />
                  </Container>
                </Box>
              } />
              <Route path="/calendar" element={
                <Box className="outer-content-container">
                  <Container className="content-container">
                    <CalendarComponent />
                  </Container>
                </Box>
              } />
              <Route path="/commute" element={
                <Box className="outer-content-container">
                  <Container className="content-container">
                    <CommuteComponent departures={departures} />
                  </Container>
                </Box>
              } />
              <Route path="/highway" element={
                <Box className="outer-content-container">
                  <Container className="content-container">
                    <HighwayBridgeComponent />
                  </Container>
                </Box>
              } />
              
              <Route path="/" element={<TvView />} />
            </Routes>
          ) : (
            <AutoLogin />
          )}
        </ThemeProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;