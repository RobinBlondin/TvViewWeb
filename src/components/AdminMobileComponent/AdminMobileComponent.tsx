import { Add, Edit } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import "./AdminMobileComponent.css";

const AdminMobileComponent: React.FC = () => {
  const handleClick = (action: string) => {
    console.log(action);
  };

  return (
    <Box
      sx={{
        width: "100vw !important",
        height: "100vh !important",
        padding: "0 !important",
        margin: "0 !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
        background: "radial-gradient(circle at top, #6e3a40, #4c2b2f, #2e1a1e)",
      }}
    >
      <Button
        className="menu-button"
        variant="contained"
        sx={{ textAlign: "start" }}
        startIcon={<Add />}
        onClick={() => handleClick("add-reminder")}
      >
        Quick Add Slide
      </Button>
      <Button
        className="menu-button"
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleClick("add-slides")}
      >
        QUICK ADD REMINDER
      </Button>

      <Button
        className="menu-button"
        variant="contained"
        startIcon={<Edit />}
        onClick={() => handleClick("edit-reminders")}
      >
        Add New Slide
      </Button>
      <Button
        className="menu-button"
        variant="contained"
        startIcon={<Edit />}
        onClick={() => handleClick("edit-slides")}
      >
        Add New Slide
      </Button>
    </Box>
  );
};

export default AdminMobileComponent;
