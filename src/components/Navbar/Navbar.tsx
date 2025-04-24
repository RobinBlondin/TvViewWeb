import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import './Navbar.css';

const Navbar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:1095px)');

  return (
    <AppBar
      position="static"
      sx={{
        background: 'rgba(0, 0, 0, 0.4)',
        color: '#FFFFFF'
      }}
    >
      <Toolbar
        className="header"
        sx={{
          flexDirection: isSmallScreen ? 'column' : 'row',
          alignItems: isSmallScreen ? 'center' : 'initial',
          textAlign: isSmallScreen ? 'center' : 'left',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1
          }}
        >
          <Button
            sx={{ fontSize: '1em', fontWeight: 600, color: '#DAD4CF' }}
            component={Link}
            to="/slides"
          >
            Slides
          </Button>
          <Button
            sx={{ fontSize: '1em', fontWeight: 600, color: '#DAD4CF' }}
            component={Link}
            to="/reminders"
          >
            Reminders
          </Button>
          <Button
            sx={{ fontSize: '1em', fontWeight: 600, color: '#DAD4CF' }}
            component={Link}
            to="/"
          >
            TvView
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
