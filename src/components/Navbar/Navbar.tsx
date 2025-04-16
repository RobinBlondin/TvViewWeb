import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: 'rgba(0, 0, 0, 0.4)',
        color: '#FFFFFF'
        }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#f2c1b6' }}>
          TvView Admin
        </Typography>
        <Box>
          <Button sx={{ fontSize: '1em', fontWeight: 600, color: '#f2c1b6'}} component={Link} to="/slides">
            Slides
          </Button>
          <Button color="inherit" sx={{ fontSize: '1em', fontWeight: 600, color: '#f2c1b6'}} component={Link} to="/reminders">
            Reminders
          </Button>
          <Button color="inherit" sx={{ fontSize: '1em', fontWeight: 600, color: '#f2c1b6'}} component={Link} to="/">
            TvView
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
