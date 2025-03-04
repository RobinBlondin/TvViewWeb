import './App.css'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import  HeaderSidebar  from './components/HeaderSidebar/HeaderSidebar'
import SlideAdmin from './components/SlideAdmin/SlideAdmin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AutoLogin from './configuration/AutoLogin';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#6b9080"
      },
      secondary: {
        main: "#a4c3b2"
      },
      background: {
        default: "#eaf4f4"
      },
      text: {
        primary: "#6b9080",
        secondary: "#a4c3b2"
      }
    }
  });
  
  console.log(GOOGLE_CLIENT_ID)

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AutoLogin />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeaderSidebar />
        <Container className="content-container">
          <SlideAdmin />
        </Container>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
