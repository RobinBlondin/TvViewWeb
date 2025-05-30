import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./Navbar.css";

const Navbar = () => {
  const isSmallScreen = useMediaQuery("(max-width:1095px)");

  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(0, 0, 0, 0.2)",
        color: "#FFFFFF",
      }}
    >
      <Toolbar
        className="header"
        sx={{
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: isSmallScreen ? "center" : "initial",
          textAlign: isSmallScreen ? "center" : "left",
        }}
      >
        <Box className="navbar-button-container">
          <Button className="navbar-button" component={Link} to="/slides">
            Slides
          </Button>
          <Button className="navbar-button" component={Link} to="/reminders">
            Reminders
          </Button>
          <Button className="navbar-button" component={Link} to="/">
            TvView
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
