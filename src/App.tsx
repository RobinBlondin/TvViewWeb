import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "./App.css";
import AdminSlides from "./components/AdminSlides/AdminSlides";
import AutoLogin from "./configuration/AutoLogin";
import { DepartureModel } from "./models/DepartureModel";
import { getBusDepartures, getTrainDepartures } from "./service/departureService";
import CommuteComponent from "./components/CommuteComponent/CommuteComponent";
import AdminReminders from "./components/AdminReminders/AdminReminders";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const TOKEN_STORAGE_KEY = import.meta.env.VITE_GOOGLE_ID_TOKEN_STORAGE_KEY;
const ACCESS_TOKEN_STORAGE_KEY = import.meta.env.VITE_GOOGLE_ACCESS_TOKEN_STORAGE_KEY;

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));
  const [departures, setDepartures] = useState<DepartureModel[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);



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

  const fetchDepartures = async () => {
    const deps = trigger? await getTrainDepartures() : await getBusDepartures();
      if (deps) setDepartures(deps);
  }
  
  setInterval(async () => {
    await fetchDepartures();
    setTrigger(!trigger)
  }, 10000);

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
            <CommuteComponent departures={departures} />
          </Box>
        ) : (
          <AutoLogin />
        )}
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
