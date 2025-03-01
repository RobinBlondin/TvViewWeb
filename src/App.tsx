import './App.css'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import  HeaderSidebar  from './components/HeaderSidebar/HeaderSidebar'

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
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderSidebar />
      <Container />
    </ThemeProvider>
  )
}

export default App
