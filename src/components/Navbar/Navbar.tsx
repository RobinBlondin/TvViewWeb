import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: '#89A8B2',
        color: '#000000'
        }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TvView Admin
        </Typography>
        <Box>
          <Button color="inherit" sx={{ fontSize: '1em', fontWeight: 600}} component={Link} to="/slides">
            Slides
          </Button>
          <Button color="inherit" sx={{ fontSize: '1em', fontWeight: 600}} component={Link} to="/reminders">
            Reminders
          </Button>
          <Button color="inherit" sx={{ fontSize: '1em', fontWeight: 600}} component={Link} to="/">
            TvView
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
